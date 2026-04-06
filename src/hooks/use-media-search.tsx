import { useQuery } from "@tanstack/react-query";
import { nasaSearchResponse } from "@/schema";
import type { NasaMediaType } from "@/types";
import { ensureHttps } from "@/utils/ensure-https";

const RESULTS_PER_PAGE = 24;

interface NasaMediaSearchArgs {
  query: string;
  page: number;
  type: NasaMediaType;
  yearStart?: number;
  yearEnd?: number;
}

async function nasaMediaSearch({
  query,
  type,
  page,
  yearStart,
  yearEnd,
}: NasaMediaSearchArgs) {
  const url = new URL("https://images-api.nasa.gov/search");

  url.searchParams.set("q", query);
  url.searchParams.set("media_type", type);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("page_size", RESULTS_PER_PAGE.toString());

  if (yearStart) {
    url.searchParams.set("year_start", yearStart.toString());
  }

  if (yearEnd) {
    url.searchParams.set("year_end", yearEnd.toString());
  }

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

function useNasaMediaSearch({
  query,
  type,
  page,
  yearStart,
  yearEnd,
}: NasaMediaSearchArgs) {
  return useQuery({
    queryKey: ["search", query, type, page, yearStart, yearEnd],
    queryFn: () => nasaMediaSearch({ query, type, page, yearStart, yearEnd }),
    enabled: !!query,
  });
}

export { useNasaMediaSearch };
