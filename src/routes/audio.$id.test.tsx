import { http, HttpResponse, delay } from "msw";
import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import { worker } from "@/test/worker";
import { renderWithRouter } from "@/test/utils";

describe("Audio Detail", () => {
  test("user sees audio details when the page loads", async () => {
    const { screen } = await renderWithRouter({
      initialEntries: ["/audio/test-audio-1"],
    });

    await expect
      .element(screen.getByLabelText("Test Title"))
      .toHaveAttribute(
        "src",
        "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~128k.m4a",
      );

    await expect
      .element(screen.getByRole("heading", { name: "Test Title", level: 1 }))
      .toBeInTheDocument();

    await expect.element(screen.getByText("0:03:45")).toBeInTheDocument();

    await expect
      .element(screen.getByText("2024-01-01 12:00:00"))
      .toBeInTheDocument();
  });

  test("user can navigate back by clicking the back button", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon", "/audio/test-audio-1"],
    });

    await userEvent.click(screen.getByRole("button", { name: /back/i }));

    await expect.poll(() => router.state.location.pathname).toBe("/search");
  });

  test("user sees keywords and can click them to search", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/audio/test-audio-1"],
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

  test("user can download the original audio", async () => {
    const { screen } = await renderWithRouter({
      initialEntries: ["/audio/test-audio-1"],
    });

    const link = screen.getByRole("link", { name: "Download Original" });

    await expect
      .element(link)
      .toHaveAttribute(
        "href",
        "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~orig.mp3",
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
      initialEntries: ["/audio/test-audio-1"],
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
      initialEntries: ["/audio/test-audio-1"],
    });

    await expect
      .element(screen.getByText("Sorry there was a problem"))
      .toBeInTheDocument();
  });

  test("renders nothing when media type is not audio", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        () => {
          return HttpResponse.json({
            "AVAIL:NASAID": "test-image-1",
            "AVAIL:DateCreated": "2024-01-01 12:00:00",
            "AVAIL:Title": "Test Image",
            "AVAIL:Description": "Test Short Description",
            "AVAIL:Keywords": ["Test Keyword 1"],
            "File:FileSize": "2.5 MB",
            "AVAIL:MediaType": "image",
            "Composite:ImageSize": "1920x1080",
          });
        },
      ),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/audio/test-image-1"],
    });

    await expect
      .element(screen.getByLabelText("Loading"))
      .not.toBeInTheDocument();

    await expect
      .element(screen.getByRole("heading", { name: "Test Image", level: 1 }))
      .not.toBeInTheDocument();
  });
});
