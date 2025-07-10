import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
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
  const mockOnSelect = vi.fn();
  const mockOnCloseDetails = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
    mockOnCloseDetails.mockClear();
  });

  it('shows "No activities found" message when activities array is empty', () => {
    render(
      <ActivityDashboard
        activities={[]}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    expect(screen.getByText("No activities found.")).toBeInTheDocument();
  });

  it('shows "No activities found" message when activities is undefined', () => {
    render(
      <ActivityDashboard
        // biome-ignore lint/suspicious/noExplicitAny: Allow undefined for testing
        activities={undefined as any}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    expect(screen.getByText("No activities found.")).toBeInTheDocument();
  });

  it("renders activity list when activities are provided", () => {
    render(
      <ActivityDashboard
        activities={mockActivities}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    expect(screen.getByText("Test Activity 1")).toBeInTheDocument();
    expect(screen.getByText("Test Activity 2")).toBeInTheDocument();
  });

  it("does not show activity details when no activity is selected", () => {
    render(
      <ActivityDashboard
        activities={mockActivities}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Activity list should be rendered
    expect(screen.getByTestId("activity-list-panel")).toBeInTheDocument();
    // Activity details should not be visible when no selectedActivity
    expect(screen.queryByTestId("activity-details-panel")).not.toBeInTheDocument();
  });

  it("shows activity details when an activity is selected", () => {
    render(
      <ActivityDashboard
        activities={mockActivities}
        selectedActivity={mockActivities[0]}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Details panel should be rendered
    expect(screen.getByTestId("activity-details-panel")).toBeInTheDocument();

    // Check for activity details specifically within the details panel
    const detailsPanel = screen.getByTestId("activity-details-panel");
    expect(detailsPanel).toHaveTextContent("Test Activity 1");
    expect(detailsPanel).toHaveTextContent("First test activity");
  });

  it("calls onSelect when activity card view button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ActivityDashboard
        activities={mockActivities}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Click on the first activity's view button
    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    await user.click(viewButton);

    // onSelect should be called with the activity ID
    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });

  it("changes layout when activity is selected - list becomes narrower", () => {
    const { rerender } = render(
      <ActivityDashboard
        activities={mockActivities}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Initially, list should have full width
    const listContainer = screen.getByTestId("activity-list-panel");
    expect(listContainer).toHaveClass("max-w-2xl");

    // Rerender with selected activity
    rerender(
      <ActivityDashboard
        activities={mockActivities}
        selectedActivity={mockActivities[0]}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // List should now be narrower
    expect(listContainer).toHaveClass("max-w-sm");
    expect(screen.getByTestId("activity-details-panel")).toBeInTheDocument();
  });

  it("calls onCloseDetails when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ActivityDashboard
        activities={mockActivities}
        selectedActivity={mockActivities[0]}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Details should be visible
    expect(screen.getByTestId("activity-details-panel")).toBeInTheDocument();

    // Find and click the close button
    const closeButton = screen.getByTestId("close-details-button");
    await user.click(closeButton);

    // onCloseDetails should be called
    expect(mockOnCloseDetails).toHaveBeenCalledTimes(1);
  });

  it("passes correct selectedId to ActivityList", () => {
    render(
      <ActivityDashboard
        activities={mockActivities}
        selectedActivity={mockActivities[1]}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    // Check that the second activity appears selected in the list panel
    const listPanel = screen.getByTestId("activity-list-panel");
    const secondActivityCard = within(listPanel).getByText("Test Activity 2").closest(".transform");
    expect(secondActivityCard).toHaveClass("border-secondary", "bg-primary/5");
  });

  it("maintains proper flex layout structure", () => {
    render(
      <ActivityDashboard
        activities={mockActivities}
        onSelect={mockOnSelect}
        onCloseDetails={mockOnCloseDetails}
      />
    );

    const mainContainer = document.querySelector(".p-4.flex.gap-8");
    expect(mainContainer).toBeInTheDocument();
  });
});
