import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { worker } from "@/test/worker";
import { renderWithQueryClient } from "@/test/render-with-query-client";
import { useMediaDetail } from "./use-media-detail";

function TestComponent({ id }: { id: string }) {
  const { isLoading, isError } = useMediaDetail({ id });

  if (isLoading) return <p>Loading</p>;

  if (isError) return <p>Error</p>;

  return <p>Success</p>;
}

describe("useMediaDetail", () => {
  test("returns data when API calls succeed", async () => {
    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Success")).toBeInTheDocument();
  });

  test("returns error when asset API returns network error", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        return HttpResponse.error();
      }),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when asset API returns non-ok status", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 });
      }),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when asset API returns invalid data", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        return HttpResponse.json({
          collection: { items: [{ invalid: true }] },
        });
      }),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when asset response has no metadata URL", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/asset/:nasaId", async () => {
        return HttpResponse.json({
          collection: {
            items: [{ href: "https://example.com/image.jpg" }],
          },
        });
      }),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when metadata API returns network error", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        async () => {
          return HttpResponse.error();
        },
      ),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when metadata API returns non-ok status", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        async () => {
          return HttpResponse.json({ error: "Not found" }, { status: 404 });
        },
      ),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when metadata API returns invalid data", async () => {
    worker.use(
      http.get(
        "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
        async () => {
          return HttpResponse.json({ invalid: true });
        },
      ),
    );

    const screen = await renderWithQueryClient(
      <TestComponent id="test-image-1" />,
    );

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });
});
