import { describe, test, expect } from "vitest";
import { renderWithRouter } from "@/test/utils";
import { userEvent } from "vitest/browser";

describe("Home", () => {
  test("prevents user from submitting an incomplete form", async () => {
    const { screen, router } = await renderWithRouter({ initialEntries: ["/"] });

    await userEvent.keyboard("{Enter}");

    await expect
      .element(screen.getByPlaceholder("e.g. Mars Rover"))
      .toBeInvalid();

    expect(router.state.location.pathname).toBe("/");
  });

  test("allows user to submit a completed form by pressing enter", async () => {
    const { screen, router } = await renderWithRouter({ initialEntries: ["/"] });

    const input = screen.getByPlaceholder("e.g. Mars Rover");

    await expect.element(input).toHaveAttribute("enterKeyHint", "search");

    await userEvent.fill(input, "Apollo");
    await userEvent.keyboard("{Enter}");

    await expect.poll(() => router.state.location.pathname).toBe("/search");

    await expect
      .poll(() => router.state.location.search)
      .toMatchObject({ query: "Apollo" });
  });

  test("allows user to search using a suggested term", async () => {
    const { screen, router } = await renderWithRouter({ initialEntries: ["/"] });

    await userEvent.click(screen.getByRole("link", { name: "Earth" }));

    await expect.poll(() => router.state.location.pathname).toBe("/search");

    await expect
      .poll(() => router.state.location.search)
      .toMatchObject({ query: "Earth" });
  });
});
