import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ActivityDashboard } from "./activity-dashboard";
import type { Activity } from "../../types/activity";

const mockActivities: Activity[] = [
  {
    id: "1",
    name: "Test Activity 1",
    description: "First test activity",
    date: "2025-07-15",
    category: "Outdoor",
    isActive: true,
    city: "New York",
    location: "Central Park",
    latitude: 40.7829,
    longitude: -73.9654,
    createdDate: "2025-07-01",
    updatedAt: null,
  },
  {
    id: "2",
    name: "Test Activity 2",
    description: "Second test activity",
    date: "2025-07-20",
    category: "Indoor",
    isActive: true,
    city: "Los Angeles",
    location: "Museum",
    latitude: 34.0522,
    longitude: -118.2437,
    createdDate: "2025-07-02",
    updatedAt: null,
  },
];

describe("ActivityDashboard", () => {
  it('shows "No activities found" message when activities array is empty', () => {
    render(<ActivityDashboard activities={[]} />);

    expect(screen.getByText("No activities found.")).toBeInTheDocument();
  });

  it('shows "No activities found" message when activities is undefined', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Allow undefined for testing
    render(<ActivityDashboard activities={undefined as any} />);

    expect(screen.getByText("No activities found.")).toBeInTheDocument();
  });

  it("renders activity list when activities are provided", () => {
    render(<ActivityDashboard activities={mockActivities} />);

    expect(screen.getByText("Test Activity 1")).toBeInTheDocument();
    expect(screen.getByText("Test Activity 2")).toBeInTheDocument();
  });

  it("does not show activity details initially", () => {
    render(<ActivityDashboard activities={mockActivities} />);

    // Activity list should be rendered
    expect(screen.getByTestId("activity-list-panel")).toBeInTheDocument();
    // First activity should be in the list
    expect(screen.queryByText("Test Activity 1")).toBeInTheDocument();
    // Activity details should not be visible initially
    expect(screen.queryByTestId("activity-details-panel")).not.toBeInTheDocument();
  });

  it("shows activity details when an activity is selected", async () => {
    const user = userEvent.setup();

    render(<ActivityDashboard activities={mockActivities} />);

    // Click on the first activity's view button
    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    await user.click(viewButton);

    // Details panel should now be rendered
    expect(screen.queryByTestId("activity-details-panel")).toBeInTheDocument();
  });

  it("changes layout when activity is selected - list becomes narrower", async () => {
    const user = userEvent.setup();

    render(<ActivityDashboard activities={mockActivities} />);

    // Initially, list should have full width and details panel should NOT exist
    const listContainer = screen.getByTestId("activity-list-panel");
    expect(listContainer).toBeInTheDocument();
    expect(screen.queryByTestId("activity-details-panel")).not.toBeInTheDocument();

    // Click on an activity
    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    await user.click(viewButton);

    // After clicking, details panel should appear and list should be narrower
    expect(screen.getByTestId("activity-details-panel")).toBeInTheDocument();
    const narrowListContainer = document.querySelector(
      ".w-full.max-w-sm.transition-all.duration-200"
    );
    expect(narrowListContainer).toBeInTheDocument();
  });

  it("closes activity details when handleOnCloseDetails is called", async () => {
    const user = userEvent.setup();

    render(<ActivityDashboard activities={mockActivities} />);

    // Initially, details panel should not be visible
    expect(screen.queryByTestId("activity-details-panel")).not.toBeInTheDocument();

    // Select an activity to show details
    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    await user.click(viewButton);

    // Details should now be visible
    expect(screen.getByTestId("activity-details-panel")).toBeInTheDocument();

    // Find and click the close button
    const closeButton = screen.getByTestId("close-details-button");
    await user.click(closeButton);

    // Details should be hidden after closing
    expect(screen.queryByTestId("activity-details-panel")).not.toBeInTheDocument();

    // List should return to full width
    const listContainer = screen.getByTestId("activity-list-panel");
    expect(listContainer).toHaveClass("max-w-2xl");
  });

  it("maintains proper flex layout structure", () => {
    render(<ActivityDashboard activities={mockActivities} />);

    const mainContainer = document.querySelector(".p-4.flex.gap-8");
    expect(mainContainer).toBeInTheDocument();
  });
});
