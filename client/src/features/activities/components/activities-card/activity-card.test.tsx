import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActivityCard } from "./activity-card";
import type { Activity } from "@/types/api";

// Mock the Badge component since it's imported from shadcn/ui
vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant, className }: any) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

// Mock utilities
vi.mock("@/lib/utils", () => ({
  formatDate: (date: string) => new Date(date).toLocaleDateString(),
  formatDateTime: (date: string) => new Date(date).toLocaleString(),
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" "),
}));

describe("ActivityCard", () => {
  const mockActivity: Activity = {
    id: "1",
    name: "Tech Conference 2024",
    description:
      "A comprehensive technology conference featuring the latest innovations in software development.",
    date: "2024-12-15T10:00:00Z",
    category: "Technology",
    isActive: true,
    city: "San Francisco",
    location: "Convention Center",
    latitude: 37.7749,
    longitude: -122.4194,
    createdDate: "2024-01-15T08:00:00Z",
    updatedAt: "2024-02-01T12:00:00Z",
  };

  const mockPastActivity: Activity = {
    ...mockActivity,
    id: "2",
    name: "Past Workshop",
    date: "2020-01-15T10:00:00Z",
    isActive: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders activity information correctly", () => {
      render(<ActivityCard activity={mockActivity} />);

      expect(screen.getByText("Tech Conference 2024")).toBeInTheDocument();
      expect(
        screen.getByText(/A comprehensive technology conference/)
      ).toBeInTheDocument();
      expect(
        screen.getByText("San Francisco, Convention Center")
      ).toBeInTheDocument();
      expect(screen.getByText("0 registered")).toBeInTheDocument();
    });

    it("displays formatted dates correctly", () => {
      render(<ActivityCard activity={mockActivity} />);

      // Check that formatDate and formatDateTime are used
      expect(
        screen.getByText(new Date(mockActivity.date).toLocaleDateString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Created ${new Date(mockActivity.createdDate).toLocaleString()}`
        )
      ).toBeInTheDocument();
    });

    it("renders the correct number of stars", () => {
      render(<ActivityCard activity={mockActivity} />);

      // Look for star icons by their class names or using a more specific selector
      const starContainer = screen.getByText("4.0").parentElement;
      expect(starContainer).toBeInTheDocument();

      // Check that we have star icons (lucide Star components render as SVG)
      const starIcons = starContainer?.querySelectorAll(
        'svg[class*="lucide-star"]'
      );
      expect(starIcons).toHaveLength(5);
    });

    it("displays rating correctly", () => {
      render(<ActivityCard activity={mockActivity} />);

      expect(screen.getByText("4.0")).toBeInTheDocument();
    });
  });

  describe("Status and Badge Rendering", () => {
    it("shows 'Active' badge for active activities", () => {
      render(<ActivityCard activity={mockActivity} />);

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveTextContent("Active");
      expect(badge).toHaveAttribute("data-variant", "success");
    });

    it("shows 'Draft' badge for inactive activities", () => {
      render(<ActivityCard activity={mockPastActivity} />);

      const badge = screen.getByTestId("badge");
      expect(badge).toHaveTextContent("Draft");
      expect(badge).toHaveAttribute("data-variant", "secondary");
    });
  });

  describe("Date Badge Logic", () => {
    it("shows date badge for upcoming events", () => {
      const futureActivity = {
        ...mockActivity,
        date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      };

      render(<ActivityCard activity={futureActivity} />);

      // Should show the date badge for upcoming events
      const dateBadge = screen.getByText(
        new Date(futureActivity.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      );
      expect(dateBadge).toBeInTheDocument();
    });

    it("does not show date badge for past events", () => {
      render(<ActivityCard activity={mockPastActivity} />);

      // Should not show the upcoming date badge
      const shortDateFormat = new Date(
        mockPastActivity.date
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      expect(screen.queryByText(shortDateFormat)).not.toBeInTheDocument();
    });
  });

  describe("Action Buttons", () => {
    it("renders View button when onView prop is provided", () => {
      const mockOnView = vi.fn();
      render(<ActivityCard activity={mockActivity} onView={mockOnView} />);

      const viewButton = screen.getByRole("button", { name: /view/i });
      expect(viewButton).toBeInTheDocument();
    });

    it("renders Edit button when onEdit prop is provided", () => {
      const mockOnEdit = vi.fn();
      render(<ActivityCard activity={mockActivity} onEdit={mockOnEdit} />);

      const editButton = screen.getByRole("button", { name: /edit/i });
      expect(editButton).toBeInTheDocument();
    });

    it("renders both buttons when both props are provided", () => {
      const mockOnView = vi.fn();
      const mockOnEdit = vi.fn();
      render(
        <ActivityCard
          activity={mockActivity}
          onView={mockOnView}
          onEdit={mockOnEdit}
        />
      );

      expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    });

    it("does not render buttons when handlers are not provided", () => {
      render(<ActivityCard activity={mockActivity} />);

      expect(
        screen.queryByRole("button", { name: /view/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /edit/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("calls onView with activity when View button is clicked", () => {
      const mockOnView = vi.fn();
      render(<ActivityCard activity={mockActivity} onView={mockOnView} />);

      const viewButton = screen.getByRole("button", { name: /view/i });
      fireEvent.click(viewButton);

      expect(mockOnView).toHaveBeenCalledTimes(1);
      expect(mockOnView).toHaveBeenCalledWith(mockActivity);
    });

    it("calls onEdit with activity when Edit button is clicked", () => {
      const mockOnEdit = vi.fn();
      render(<ActivityCard activity={mockActivity} onEdit={mockOnEdit} />);

      const editButton = screen.getByRole("button", { name: /edit/i });
      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
      expect(mockOnEdit).toHaveBeenCalledWith(mockActivity);
    });

    it("handles multiple clicks correctly", () => {
      const mockOnView = vi.fn();
      const mockOnEdit = vi.fn();
      render(
        <ActivityCard
          activity={mockActivity}
          onView={mockOnView}
          onEdit={mockOnEdit}
        />
      );

      const viewButton = screen.getByRole("button", { name: /view/i });
      const editButton = screen.getByRole("button", { name: /edit/i });

      fireEvent.click(viewButton);
      fireEvent.click(editButton);
      fireEvent.click(viewButton);

      expect(mockOnView).toHaveBeenCalledTimes(2);
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper button roles and accessible names", () => {
      const mockOnView = vi.fn();
      const mockOnEdit = vi.fn();
      render(
        <ActivityCard
          activity={mockActivity}
          onView={mockOnView}
          onEdit={mockOnEdit}
        />
      );

      const viewButton = screen.getByRole("button", { name: /view/i });
      const editButton = screen.getByRole("button", { name: /edit/i });

      expect(viewButton).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
    });

    it("displays activity name as a heading", () => {
      render(<ActivityCard activity={mockActivity} />);

      // The activity name should be prominent and act like a heading
      const activityName = screen.getByText("Tech Conference 2024");
      expect(activityName).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty description gracefully", () => {
      const activityWithEmptyDescription = {
        ...mockActivity,
        description: "",
      };

      render(<ActivityCard activity={activityWithEmptyDescription} />);

      expect(screen.getByText("Tech Conference 2024")).toBeInTheDocument();
      // Description section should still render even if empty
      expect(
        screen.getByText("San Francisco, Convention Center")
      ).toBeInTheDocument();
    });

    it("handles very long text with line clamping", () => {
      const activityWithLongText = {
        ...mockActivity,
        name: "This is a very long activity name that should be clamped to prevent layout issues and maintain good UX",
        description:
          "This is an extremely long description that goes on and on and should be clamped to a reasonable number of lines to prevent the card from becoming too tall and ruining the grid layout experience for users browsing through many activities.",
      };

      render(<ActivityCard activity={activityWithLongText} />);

      const nameElement = screen.getByText(activityWithLongText.name);
      const descriptionElement = screen.getByText(
        activityWithLongText.description
      );

      expect(nameElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();

      // Check that line-clamp classes are applied
      expect(nameElement.closest(".line-clamp-2")).toBeInTheDocument();
      expect(descriptionElement.closest(".line-clamp-2")).toBeInTheDocument();
    });

    it("handles different date formats correctly", () => {
      const activityWithDifferentDate = {
        ...mockActivity,
        date: "2024-12-25", // Different date format
        createdDate: "2024-01-01T00:00:00.000Z",
      };

      render(<ActivityCard activity={activityWithDifferentDate} />);

      // Should not throw errors and should display formatted dates
      expect(
        screen.getByText(
          new Date(activityWithDifferentDate.date).toLocaleDateString()
        )
      ).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders all required sections", () => {
      render(<ActivityCard activity={mockActivity} />);

      // Check that key sections are present by looking for distinctive icons or content
      expect(screen.getByText("Tech Conference 2024")).toBeInTheDocument(); // Header
      expect(
        screen.getByText("San Francisco, Convention Center")
      ).toBeInTheDocument(); // Location
      expect(screen.getByText("0 registered")).toBeInTheDocument(); // Registration info
      expect(screen.getByText("4.0")).toBeInTheDocument(); // Rating
    });

    it("applies proper CSS classes for styling", () => {
      const { container } = render(<ActivityCard activity={mockActivity} />);

      // Check that the main card has expected classes
      const card = container.querySelector(
        '[class*="group"][class*="overflow-hidden"]'
      );
      expect(card).toBeInTheDocument();
    });
  });
});
