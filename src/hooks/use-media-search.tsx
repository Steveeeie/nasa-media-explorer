import { useQuery } from "@tanstack/react-query";
import { nasaSearchResponse } from "@/schema";
import type { NasaMediaType } from "@/types";
import { ensureHttps } from "@/utils/ensure-https";

const RESULTS_PER_PAGE = 24;

interface NasaMediaSearchArgs {
  query: string;
  page: number;
  type: NasaMediaType;
}

async function nasaMediaSearch({ query, type, page }: NasaMediaSearchArgs) {
  const url = new URL("https://images-api.nasa.gov/search");

  url.searchParams.set("q", query);
  url.searchParams.set("media_type", type);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("page_size", RESULTS_PER_PAGE.toString());

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch NASA media");
  }

  const data = await response.json();

  const result = nasaSearchResponse.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid response from NASA API");
  }

  const { total, results: rawResults } = result.data;
  const results = rawResults.map((item) => ({
    ...item,
    thumbnail: ensureHttps(item.thumbnail),
  }));
  const totalResults = total;
  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    totalPages,
    totalResults,
    results,
    hasNextPage,
    hasPreviousPage,
  };
}

function useNasaMediaSearch({ query, type, page }: NasaMediaSearchArgs) {
  return useQuery({
    queryKey: ["search", query, type, page],
    queryFn: () => nasaMediaSearch({ query, type, page }),
    enabled: !!query,
  });
}

export { useNasaMediaSearch };
