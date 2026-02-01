import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { worker } from "@/test/worker";
import { renderWithQueryClient } from "@/test/render-with-query-client";
import { useNasaMediaSearch } from "./use-media-search";

function TestComponent() {
  const { isLoading, isError } = useNasaMediaSearch({
    query: "test",
    type: "image",
    page: 1,
  });

  if (isLoading) return <p>Loading</p>;

  if (isError) return <p>Error</p>;

  return <p>Success</p>;
}

describe("useNasaMediaSearch", () => {
  test("returns data when API call succeeds", async () => {
    const screen = await renderWithQueryClient(<TestComponent />);

    await expect.element(screen.getByText("Success")).toBeInTheDocument();
  });

  test("returns error when API returns network error", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.error();
      }),
    );

    const screen = await renderWithQueryClient(<TestComponent />);

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when API returns non-ok status", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }),
    );

    const screen = await renderWithQueryClient(<TestComponent />);

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });

  test("returns error when API returns invalid data", async () => {
    worker.use(
      http.get("https://images-api.nasa.gov/search", async () => {
        return HttpResponse.json({
          collection: { items: [{ wrong: true }] },
        });
      }),
    );

    const screen = await renderWithQueryClient(<TestComponent />);

    await expect.element(screen.getByText("Error")).toBeInTheDocument();
  });
});
