import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Layout from "@/components/layout";

describe("Layout", () => {
  it("renders children content", () => {
    const testContent = "Test content";
    render(
      <Layout>
        <div>{testContent}</div>
      </Layout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("renders navbar component", () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    // Get the first Planora element (which should be in the navbar)
    const navbar = screen.getByRole("banner");
    const planoraInNavbar = within(navbar).getByText("Planora");

    expect(planoraInNavbar).toBeInTheDocument();
  });

  it("renders footer component", () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    // Check for copyright text which should be in footer
    const copyrightElement = screen.getByText(/© \d{4}/);
    expect(copyrightElement).toBeInTheDocument();
  });

  it("has proper layout structure with flex column and min-height", () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );

    const layoutDiv = screen.getByText("Test").closest(".flex");
    expect(layoutDiv).toHaveClass("flex", "flex-col", "min-h-screen");
  });
});
