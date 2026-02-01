import { http, HttpResponse, delay } from "msw";
import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import { worker } from "@/test/worker";
import { renderWithRouter } from "@/test/utils";

describe("Image Detail", () => {
  test("user sees image details when the page loads", async () => {
    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    await expect
      .element(screen.getByAltText("Test Title"))
      .toHaveAttribute(
        "src",
        "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~medium.jpg",
      );

    await expect
      .element(screen.getByRole("heading", { name: "Test Title", level: 1 }))
      .toBeInTheDocument();

    await expect
      .element(screen.getByText("Test Short Description"))
      .toBeInTheDocument();

    await expect.element(screen.getByText("1920x1080")).toBeInTheDocument();

    await expect
      .element(screen.getByText("2024-01-01 12:00:00"))
      .toBeInTheDocument();
  });

  test("user does not see description when it matches the title", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        () => {
          return HttpResponse.json({
            "AVAIL:NASAID": "test-image-1",
            "AVAIL:DateCreated": "2024-01-01 12:00:00",
            "AVAIL:Title": "Duplicate Title",
            "AVAIL:Description": "Duplicate Title",
            "AVAIL:Description508": "Duplicate Title",
            "AVAIL:Keywords": ["Test Keyword 1"],
            "File:FileSize": "2.5 MB",
            "AVAIL:MediaType": "image",
            "Composite:ImageSize": "1920x1080",
          });
        },
      ),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    await expect
      .element(
        screen.getByRole("heading", { name: "Duplicate Title", level: 1 }),
      )
      .toBeInTheDocument();

    await expect.element(screen.getByText("Duplicate Title")).toHaveLength(1);
  });

  test("user can navigate back by clicking the back button", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon", "/image/test-image-1"],
    });

    await userEvent.click(screen.getByRole("button", { name: /back/i }));

    await expect.poll(() => router.state.location.pathname).toBe("/search");
  });

  test("user sees keywords and can click them to search", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    await expect
      .element(screen.getByRole("heading", { name: "Keywords", level: 2 }))
      .toBeInTheDocument();

    const list = screen.getByRole("list");
    const items = list.getByRole("listitem");

    await expect.element(items).toHaveLength(2);

    await userEvent.click(screen.getByRole("link", { name: "Test Keyword 1" }));

    await expect.poll(() => router.state.location.pathname).toBe("/search");

    await expect
      .poll(() => router.state.location.search.query)
      .toBe("Test Keyword 1");
  });

  test("user can view the original image", async () => {
    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    const link = screen.getByRole("link", { name: "Download Original" });

    await expect
      .element(link)
      .toHaveAttribute(
        "href",
        "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~orig.tif",
      );

    await expect.element(link).toHaveAttribute("target", "_blank");
    await expect.element(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("user sees loading state when data is loading", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        await delay("infinite");
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    await expect.element(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  test("user sees error message when there is an error", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        return HttpResponse.error();
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-image-1"],
    });

    await expect
      .element(screen.getByText("Sorry there was a problem"))
      .toBeInTheDocument();
  });

  test("renders nothing when media type is not image", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        () => {
          return HttpResponse.json({
            "AVAIL:NASAID": "test-video-1",
            "AVAIL:DateCreated": "2024-01-01 12:00:00",
            "AVAIL:Title": "Test Video",
            "AVAIL:Description": "Test Short Description",
            "AVAIL:Keywords": ["Test Keyword 1"],
            "File:FileSize": "2.5 MB",
            "AVAIL:MediaType": "video",
            "Composite:ImageSize": "1920x1080",
          });
        },
      ),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/image/test-video-1"],
    });

    await expect
      .element(screen.getByLabelText("Loading"))
      .not.toBeInTheDocument();

    await expect
      .element(screen.getByRole("heading", { name: "Test Video", level: 1 }))
      .not.toBeInTheDocument();
  });
});
