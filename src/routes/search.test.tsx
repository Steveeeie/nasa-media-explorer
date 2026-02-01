import { renderWithRouter } from "@/test/utils";
import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";
import { http, HttpResponse, delay } from "msw";
import { worker } from "@/test/worker";

describe("Search", () => {
  test("user should be redirected to the home page if query isn't set", async () => {
    const { router } = await renderWithRouter({
      initialEntries: ["/search"],
    });

    await expect.poll(() => router.state.location.pathname).toBe("/");
  });

  test("user can return to the home page by clicking the logo", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await userEvent.click(screen.getByAltText("NASA"));

    await expect.poll(() => router.state.location.pathname).toBe("/");
  });

  test("user can update the search term", async () => {
    const { router, screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await userEvent.fill(screen.getByPlaceholder("e.g. Mars Rover"), "Mars");
    await userEvent.keyboard("{Enter}");

    await expect.poll(() => router.state.location.search.query).toBe("Mars");

    await expect
      .element(
        screen.getByRole("heading", {
          name: 'Search Results for "Mars"',
          level: 1,
        }),
      )
      .toBeInTheDocument();
  });

  test("user can change type to image and the results render correctly", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await userEvent.click(screen.getByRole("link", { name: "Images" }));

    await expect.poll(() => router.state.location.search.type).toBe("image");

    const list = screen.getByRole("list", { name: "Image Results" });

    const items = list.getByRole("listitem");

    await expect.element(items).toHaveLength(3);

    await expect
      .element(screen.getByRole("link", { name: "Moon image 1" }))
      .toHaveAttribute("href", "/image/test-image-1");

    await expect
      .element(screen.getByAltText("Moon image 1"))
      .toHaveAttribute(
        "src",
        "https://images-assets.nasa.gov/image/PIA00342/PIA00342~thumb.jpg",
      );

    await expect
      .element(screen.getByRole("heading", { name: "Moon image 1", level: 2 }))
      .toBeInTheDocument();
  });

  test("user can change type to video and the results render correctly", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await userEvent.click(screen.getByRole("link", { name: "Videos" }));

    await expect.poll(() => router.state.location.search.type).toBe("video");

    const list = screen.getByRole("list", { name: "Video Results" });

    const items = list.getByRole("listitem");

    await expect.element(items).toHaveLength(3);

    await expect
      .element(screen.getByRole("link", { name: "Moon video 1" }))
      .toHaveAttribute("href", "/video/test-video-1");

    await expect
      .element(screen.getByAltText("Moon Video 1 Title"))
      .toHaveAttribute(
        "src",
        "https://images-assets.nasa.gov/video/GSFC_20140421_EarthOrbit_m11525/GSFC_20140421_EarthOrbit_m11525~thumb.jpg",
      );

    await expect
      .element(
        screen.getByRole("heading", { name: "Moon Video 1 Title", level: 2 }),
      )
      .toBeInTheDocument();

    await expect
      .element(screen.getByText("Moon Video 1 Description"))
      .toBeInTheDocument();
  });

  test("user can change type to audio and the results render correctly", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await userEvent.click(screen.getByRole("link", { name: "Audio" }));

    await expect.poll(() => router.state.location.search.type).toBe("audio");

    const list = screen.getByRole("list", { name: "Audio Results" });

    const items = list.getByRole("listitem");

    await expect.element(items).toHaveLength(3);

    await expect
      .element(screen.getByRole("link", { name: "Moon Audio 1 Title" }))
      .toHaveAttribute("href", "/audio/test-audio-1");

    await expect
      .element(
        screen.getByRole("heading", { name: "Moon Audio 1 Title", level: 2 }),
      )
      .toBeInTheDocument();
  });

  test("user is shown a loading state if the network request is slow", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        await delay("infinite");
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await expect.element(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  test("user is shown a message when there are no results", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.json({
          collection: { items: [], metadata: { total_hits: 0 } },
        });
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await expect
      .element(screen.getByText("Found 0 results"))
      .toBeInTheDocument();
  });

  test("user is shown an error message when there is an error", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.error();
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await expect
      .element(screen.getByText("Failed to search. Please try again."))
      .toBeInTheDocument();
  });

  test("user can only navigate to the next page from the first", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await expect.element(screen.getByText("Previous")).toBeDisabled();

    await userEvent.click(screen.getByText("Next"));

    await expect.poll(() => router.state.location.search.page).toBe(2);

    await expect.element(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  test("user can only navigate to the previous page from the last", async () => {
    const { screen, router } = await renderWithRouter({
      initialEntries: ["/search?query=Moon&page=3"],
    });

    await expect.element(screen.getByText("Next")).toBeDisabled();

    await userEvent.click(screen.getByText("Previous"));

    await expect.poll(() => router.state.location.search.page).toBe(2);

    await expect.element(screen.getByText("Page 2 of 3")).toBeInTheDocument();
  });

  test("user can navigate to the next page and previous pages from the middle", async () => {
    const { screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon&page=2"],
    });

    await expect.element(screen.getByText("Next")).not.toBeDisabled();
    await expect.element(screen.getByText("Previous")).not.toBeDisabled();
  });

  test("user doesn't see pagination when there's only 1 page of results", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.json({
          collection: { items: [], metadata: { total_hits: 1 } },
        });
      }),
    );

    const { screen } = await renderWithRouter({
      initialEntries: ["/search?query=Moon"],
    });

    await expect.element(screen.getByText("Next")).not.toBeInTheDocument();
    await expect.element(screen.getByText("Previous")).not.toBeInTheDocument();
  });
});
