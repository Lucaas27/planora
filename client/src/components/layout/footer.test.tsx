import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/footer";

describe("Footer", () => {
  it("renders copyright text with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    // Find the copyright span by looking for the copyright symbol
    const copyrightElement = screen.getByText(/© \d{4}/);
    expect(copyrightElement.textContent).toContain(`© ${currentYear}`);
    expect(copyrightElement.textContent).toContain("Planora");
    expect(copyrightElement.textContent).toContain("All rights reserved");
  });

  it("renders all footer navigation links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /activities/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /privacy/i })).toBeInTheDocument();
  });

  it("has correct href attributes for footer links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /activities/i })).toHaveAttribute(
      "href",
      "/activities"
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
  });

  it("renders GitHub social media link", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/Lucaas27");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Planora brand link in copyright", () => {
    render(<Footer />);

    const brandLink = screen.getByRole("link", { name: /planora/i });
    expect(brandLink).toHaveAttribute("href", "/");
    expect(brandLink).toHaveAttribute("target", "_blank");
  });
});
