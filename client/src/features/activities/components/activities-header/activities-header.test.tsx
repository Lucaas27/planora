import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ActivitiesHeader } from "./activities-header";

describe("ActivitiesHeader", () => {
  // Test basic rendering
  it("renders the header with title and description", () => {
    render(<ActivitiesHeader />);

    expect(screen.getByText("My Events")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Manage and organize all your amazing events in one place"
      )
    ).toBeInTheDocument();
  });

  // Test search input
  it("renders search input with correct placeholder", () => {
    render(<ActivitiesHeader />);

    const searchInput = screen.getByPlaceholderText("Search your events...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  // Test that search input can be typed in
  it("allows typing in search input", async () => {
    const user = userEvent.setup();
    render(<ActivitiesHeader />);

    const searchInput = screen.getByPlaceholderText("Search your events...");
    await user.type(searchInput, "Birthday party");

    expect(searchInput).toHaveValue("Birthday party");
  });

  // Test create button when callback is provided
  it("renders create event button when onCreateNew is provided", () => {
    const mockOnCreateNew = vi.fn();
    render(<ActivitiesHeader onCreateNew={mockOnCreateNew} />);

    const createButton = screen.getByRole("button", { name: /create event/i });
    expect(createButton).toBeInTheDocument();
  });

  // Test create button click
  it("calls onCreateNew when create event button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnCreateNew = vi.fn();
    render(<ActivitiesHeader onCreateNew={mockOnCreateNew} />);

    const createButton = screen.getByRole("button", { name: /create event/i });
    await user.click(createButton);

    expect(mockOnCreateNew).toHaveBeenCalledTimes(1);
  });

  // Test that create button is not rendered when no callback
  it("does not render create event button when onCreateNew is not provided", () => {
    render(<ActivitiesHeader />);

    const createButton = screen.queryByRole("button", {
      name: /create event/i,
    });
    expect(createButton).not.toBeInTheDocument();
  });

  // Test filter button
  it("renders filter button", () => {
    render(<ActivitiesHeader />);

    const filterButton = screen.getByRole("button", { name: /filter/i });
    expect(filterButton).toBeInTheDocument();
  });

  // Test view mode buttons
  it("renders grid and list view mode buttons", () => {
    render(<ActivitiesHeader />);

    const gridButton = screen.getByRole("button", { name: /grid view/i });
    const listButton = screen.getByRole("button", { name: /list view/i });

    expect(gridButton).toBeInTheDocument();
    expect(listButton).toBeInTheDocument();
  });

  // Test default view mode (grid should be selected)
  it("has grid view mode selected by default", () => {
    render(<ActivitiesHeader />);

    // We can check for the class names since grid button has default variant and list has ghost
    const gridButton = screen.getByRole("button", { name: /grid view/i });
    const listButton = screen.getByRole("button", { name: /list view/i });

    // Check that grid button has the selected state classes
    expect(gridButton).toHaveClass("bg-primary");
    // Check that list button has the ghost state classes
    expect(listButton).toHaveClass("hover:bg-accent");
  });

  // Test view mode toggle
  it("toggles view mode when list button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActivitiesHeader />);

    const gridButton = screen.getByRole("button", { name: /grid view/i });
    const listButton = screen.getByRole("button", { name: /list view/i });

    // Initially grid should be selected
    expect(gridButton).toHaveClass("bg-primary");
    expect(listButton).toHaveClass("hover:bg-accent");

    // Click list button
    await user.click(listButton);

    // Now list should be selected
    expect(listButton).toHaveClass("bg-primary");
    expect(gridButton).toHaveClass("hover:bg-accent");
  });

  // Test view mode toggle back to grid
  it("can toggle back to grid view mode", async () => {
    const user = userEvent.setup();
    render(<ActivitiesHeader />);

    const gridButton = screen.getByRole("button", { name: /grid view/i });
    const listButton = screen.getByRole("button", { name: /list view/i });

    // Click list button first
    await user.click(listButton);
    expect(listButton).toHaveClass("bg-primary");

    // Click grid button to go back
    await user.click(gridButton);
    expect(gridButton).toHaveClass("bg-primary");
    expect(listButton).toHaveClass("hover:bg-accent");
  });

  // Test that search icon is present
  it("renders search icon in search input", () => {
    render(<ActivitiesHeader />);

    // We can check for the search icon by looking for an svg with specific class
    const searchIcon = document.querySelector(".absolute.left-3");
    expect(searchIcon).toBeInTheDocument();
  });

  // Test multiple interactions
  it("handles multiple user interactions correctly", async () => {
    const user = userEvent.setup();
    const mockOnCreateNew = vi.fn();
    render(<ActivitiesHeader onCreateNew={mockOnCreateNew} />);

    // Type in search
    const searchInput = screen.getByPlaceholderText("Search your events...");
    await user.type(searchInput, "conference");
    expect(searchInput).toHaveValue("conference");

    // Toggle view mode
    const listButton = screen.getByRole("button", { name: /list view/i });
    await user.click(listButton);
    expect(listButton).toHaveClass("bg-primary");

    // Click create button
    const createButton = screen.getByRole("button", { name: /create event/i });
    await user.click(createButton);
    expect(mockOnCreateNew).toHaveBeenCalledTimes(1);

    // Search should still have the value
    expect(searchInput).toHaveValue("conference");
  });

  // Test accessibility
  it("has proper accessibility attributes", () => {
    const mockOnCreateNew = vi.fn();
    render(<ActivitiesHeader onCreateNew={mockOnCreateNew} />);

    // Check that buttons are properly labeled
    expect(
      screen.getByRole("button", { name: /create event/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /filter/i })).toBeInTheDocument();

    // Check that search input is accessible
    const searchInput = screen.getByPlaceholderText("Search your events...");
    expect(searchInput).toHaveAttribute("type", "text");
  });

  // Test component structure
  it("has the correct component structure", () => {
    render(<ActivitiesHeader />);

    // Check main container
    const container = document.querySelector(".space-y-6");
    expect(container).toBeInTheDocument();

    // Check header section
    const headerSection = document.querySelector(
      ".flex.flex-col.md\\:flex-row"
    );
    expect(headerSection).toBeInTheDocument();

    // Check search and filter bar
    const searchBar = document.querySelector(".bg-white.p-4.rounded-2xl");
    expect(searchBar).toBeInTheDocument();
  });
});
