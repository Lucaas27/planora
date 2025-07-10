import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ActivityCard } from "./activity-card";
import type { Activity } from "../../types/activity";

const mockActivity: Activity = {
  id: "1",
  name: "Test Activity",
  description: "This is a test activity description",
  date: "2025-07-15",
  category: "Outdoor",
  isActive: true,
  city: "New York",
  location: "Central Park",
  latitude: 40.7829,
  longitude: -73.9654,
  createdDate: "2025-07-01",
  updatedAt: null,
};

describe("ActivityCard", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders activity information correctly", () => {
    render(
      <ActivityCard activity={mockActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    expect(screen.getByText("Test Activity")).toBeInTheDocument();
    expect(screen.getByText("This is a test activity description")).toBeInTheDocument();
    expect(screen.getByText("Outdoor")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
  });

  it("displays formatted date correctly", () => {
    render(
      <ActivityCard activity={mockActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    // The date should be formatted - exact format depends on your formatDate utility
    expect(screen.getByText(/15 Jul 25/)).toBeInTheDocument();
  });

  it("applies selected styling when activity is selected", () => {
    render(
      <ActivityCard activity={mockActivity} isActivitySelected={true} onSelect={mockOnSelect} />
    );

    const card = screen.getByText("Test Activity").closest(".transform");
    expect(card).toHaveClass("border-secondary", "bg-primary/5");
  });

  it("does not apply selected styling when activity is not selected", () => {
    render(
      <ActivityCard activity={mockActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    const card = screen.getByText("Test Activity").closest(".transform");
    expect(card).not.toHaveClass("border-secondary");
    expect(card).toHaveClass("border-0");
  });

  it("calls onSelect with correct activity id when View button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ActivityCard activity={mockActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    expect(mockOnSelect).toHaveBeenCalledWith("1");
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it("renders bookmark icon", () => {
    render(
      <ActivityCard activity={mockActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    const bookmarkIcon = screen.getByTestId("bookmark-icon");

    expect(bookmarkIcon).toBeInTheDocument();
  });

  it("truncates long descriptions and titles properly", () => {
    const longActivity = {
      ...mockActivity,
      name: "This is a very long activity name that should be truncated properly when displayed in the card component",
      description:
        "This is a very long description that should also be truncated when displayed in the activity card to prevent layout issues and maintain a clean design",
    };

    render(
      <ActivityCard activity={longActivity} isActivitySelected={false} onSelect={mockOnSelect} />
    );

    const title = screen.getByText(/This is a very long activity name/);
    const description = screen.getByText(/This is a very long description/);

    expect(title).toHaveClass("line-clamp-2");
    expect(description).toHaveClass("line-clamp-2");
  });
});
