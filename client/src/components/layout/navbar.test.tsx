import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from "./navbar";

describe("Navbar", () => {
  it("renders the Planora logo and brand name", () => {
    render(<Navbar />);

    const logo = screen.getByTestId("navbar-logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders all navigation links on desktop", () => {
    render(<Navbar />);

    // Check for main navigation links
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /activities/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("renders create activity button", () => {
    render(<Navbar />);

    expect(screen.getByRole("button", { name: /create activity/i })).toBeInTheDocument();
  });

  it("renders mobile menu trigger button", () => {
    render(<Navbar />);

    // Use getByTestId to find the mobile menu trigger
    const mobileMenuButton = screen.getByTestId("navbar-mobile-menu-trigger");
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it("has correct href attributes for navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /activities/i })).toHaveAttribute(
      "href",
      "/activities"
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });

  it("logo links to homepage", () => {
    render(<Navbar />);

    const logoLink = screen.getByRole("link", { name: /planora/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
