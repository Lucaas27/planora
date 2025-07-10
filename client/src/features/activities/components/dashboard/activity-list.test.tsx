import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ActivityList } from "./activity-list";
import type { Activity } from "../../types/activity";

const mockActivities: Activity[] = [
  {
    id: "1",
    name: "First Activity",
    description: "First activity description",
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
    name: "Second Activity",
    description: "Second activity description",
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

describe("ActivityList", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders all activities", () => {
    render(
      <ActivityList activities={mockActivities} selectedId={undefined} onSelect={mockOnSelect} />
    );

    expect(screen.getByText("First Activity")).toBeInTheDocument();
    expect(screen.getByText("Second Activity")).toBeInTheDocument();
  });

  it("passes correct props to ActivityCard components", () => {
    render(<ActivityList activities={mockActivities} selectedId="1" onSelect={mockOnSelect} />);

    // Check that the first activity is marked as selected
    const firstCard = screen.getByText("First Activity").closest(".transform");
    expect(firstCard).toHaveClass("border-secondary", "bg-primary/5");

    // Check that the second activity is not marked as selected
    const secondCard = screen.getByText("Second Activity").closest(".transform");
    expect(secondCard).not.toHaveClass("border-secondary");
  });

  it("calls onSelect when activity card is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ActivityList activities={mockActivities} selectedId={undefined} onSelect={mockOnSelect} />
    );

    const firstViewButton = screen.getAllByRole("button", { name: /view/i })[0];
    await user.click(firstViewButton);

    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });

  it("renders empty list when no activities provided", () => {
    render(<ActivityList activities={[]} selectedId={undefined} onSelect={mockOnSelect} />);

    // Should render the container but no activity cards
    const container = document.querySelector(".flex.flex-col");
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("First Activity")).not.toBeInTheDocument();
  });

  it("maintains proper gap between activity cards", () => {
    render(
      <ActivityList activities={mockActivities} selectedId={undefined} onSelect={mockOnSelect} />
    );

    const container = document.querySelector(".flex.flex-col.justify-center.gap-4");
    expect(container).toBeInTheDocument();
  });
});
