import { type ReactNode } from "react";
import { render } from "vitest-browser-react";
import { describe, expect, test, vi } from "vitest";
import { VideoResults } from "./index";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("VideoResults", () => {
  describe("Item", () => {
    test("applies loaded class when image loads", async () => {
      const { getByRole } = await render(
        <VideoResults>
          <VideoResults.Item
            id="test-id"
            title="Test Video"
            thumbnail="https://example.com/thumb.jpg"
          />
        </VideoResults>,
      );

      const listItem = getByRole("listitem");
      const image = getByRole("img");

      await expect.element(listItem).not.toHaveClass(/loaded/);
      await image.element().dispatchEvent(new Event("load"));
      await expect.element(listItem).toHaveClass(/loaded/);
    });
  });
});
