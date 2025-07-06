import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ActivityDetails } from "@/features/activities/components/details/activity-details";
import type { Activity } from "@/features/activities/types/activity";

const mockActivity: Activity = {
  id: "1",
  name: "Test Activity Details",
  description: "This is a detailed test activity",
  date: "2025-07-15",
  category: "Adventure",
  isActive: true,
  city: "San Francisco",
  location: "Golden Gate Park",
  latitude: 37.7749,
  longitude: -122.4194,
  createdDate: "2025-07-01",
  updatedAt: "2025-07-05",
};

describe("ActivityDetails", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders activity details correctly", () => {
    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    expect(screen.getByText(mockActivity.name)).toBeInTheDocument();
    expect(screen.getByText(mockActivity.description)).toBeInTheDocument();
    expect(screen.getByText(mockActivity.category)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco/)).toBeInTheDocument();
  });

  it("displays formatted date", () => {
    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    // Should display formatted date (exact format depends on formatDate utility)
    expect(screen.getByText(/15 Jul 25/)).toBeInTheDocument();
  });

  it("renders close button and calls onCloseDetails when clicked", async () => {
    const user = userEvent.setup();

    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    const closeButton = screen.getByTestId("close-details-button");

    await user.click(closeButton);
    expect(closeButton).toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has proper card styling with rounded corners and no border", () => {
    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    const card = document.querySelector(".rounded-2xl.border-0.pt-0.shadow-md");
    expect(card).toBeInTheDocument();
  });

  it("renders header with gradient background", () => {
    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    const header = document.querySelector(".bg-gradient-to-br");
    expect(header).toBeInTheDocument();
  });

  it("renders location information with icons", () => {
    render(<ActivityDetails activity={mockActivity} handleOnCloseDetails={mockOnClose} />);

    const mapPinIcon = document.querySelector(".lucide-map-pin");
    const calendarIcon = document.querySelector(".lucide-calendar");
    expect(mapPinIcon).toBeInTheDocument();
    expect(calendarIcon).toBeInTheDocument();
  });
});
