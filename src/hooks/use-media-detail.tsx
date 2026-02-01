import { useQuery } from "@tanstack/react-query";
import { assetResponse, metadataResponse } from "@/schema";
import { ensureHttps } from "@/utils/ensure-https";

interface MediaDetailArgs {
  id: string;
}

async function fetchMediaDetail({ id }: MediaDetailArgs) {
  const assetRes = await fetch(`https://images-api.nasa.gov/asset/${id}`);

  if (!assetRes.ok) {
    throw new Error("Failed to fetch asset links");
  }

  const assetData = await assetRes.json();
  const assetResult = assetResponse.safeParse(assetData);

  if (!assetResult.success) {
    throw new Error("Invalid asset response from NASA API");
  }

  const links = assetResult.data;

  const metadataUrl = links.find((item) =>
    item.href.endsWith("metadata.json")
  )?.href;

  if (!metadataUrl) {
    throw new Error("No metadata URL found in asset response");
  }

  const metadataRes = await fetch(ensureHttps(metadataUrl));

  if (!metadataRes.ok) {
    throw new Error("Failed to fetch metadata");
  }

  const metadataData = await metadataRes.json();
  const metadataResult = metadataResponse.safeParse(metadataData);

  if (!metadataResult.success) {
    throw new Error("Invalid metadata response from NASA API");
  }

  return {
    links: links.map((link) => ({
      ...link,
      href: ensureHttps(link.href),
    })),
    metadata: metadataResult.data,
  };
}

function useMediaDetail({ id }: MediaDetailArgs) {
  return useQuery({
    queryKey: ["media-detail", id],
    queryFn: () => fetchMediaDetail({ id }),
    enabled: !!id,
  });
}

export { useMediaDetail };
