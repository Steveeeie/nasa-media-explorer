import { type ReactNode } from "react";
import { render } from "vitest-browser-react";
import { describe, expect, test, vi } from "vitest";
import { ImageResults } from "./index";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("ImageResults", () => {
  describe("Item", () => {
    test("applies loaded class when image loads", async () => {
      const { getByRole } = await render(
        <ImageResults>
          <ImageResults.Item
            id="test-id"
            title="Test Image"
            thumbnail="https://example.com/image.jpg"
          />
        </ImageResults>,
      );

      const listItem = getByRole("listitem");
      const image = getByRole("img");

      await expect.element(listItem).not.toHaveClass(/loaded/);
      await image.element().dispatchEvent(new Event("load"));
      await expect.element(listItem).toHaveClass(/loaded/);
    });
  });
});
