import { z } from "zod";

const nasaMediaType = z.enum(["image", "video", "audio"]);

const nasaMediaItemData = z
  .array(
    z.object({
      date_created: z.string(),
      description: z.string().optional(),
      media_type: nasaMediaType,
      nasa_id: z.string(),
      title: z.string(),
    })
  )
  .transform((item) => ({
    id: item[0].nasa_id,
    title: item[0].title,
    description: item[0].description,
    date: item[0].date_created,
  }));

const nasaMediaItemLinks = z
  .array(
    z.object({
      href: z.string(),
      rel: z.string(),
    })
  )
  .optional()
  .transform((links) => links?.find((link) => link.rel === "preview")?.href);

const nasaMediaItem = z
  .object({
    data: nasaMediaItemData,
    links: nasaMediaItemLinks,
  })
  .transform((item) => ({
    ...item.data,
    thumbnail: item.links,
  }));

const nasaSearchResponse = z
  .object({
    collection: z.object({
      items: z.array(nasaMediaItem),
      metadata: z.object({
        total_hits: z.number(),
      }),
    }),
  })
  .transform((data) => ({
    results: data.collection.items,
    total: data.collection.metadata.total_hits,
  }));

const assetLink = z.object({
  href: z.string(),
  rel: z.string().optional(),
});

const assetResponse = z
  .object({
    collection: z.object({
      items: z.array(assetLink),
    }),
  })
  .transform((data) => data.collection.items);

const metadataLocationResponse = z.object({
  location: z.string(),
});

const metadataBaseResponse = z.object({
  "AVAIL:NASAID": z.string(),
  "AVAIL:DateCreated": z.string(),
  "AVAIL:Title": z.string(),
  "AVAIL:Description": z.string().optional(),
  "AVAIL:Description508": z.string().optional(),
  "AVAIL:Keywords": z.array(z.string()).optional(),
  "AVAIL:Location": z.string().optional(),
  "File:FileSize": z.string().optional(),
});

const transformBaseMetadata = (data: z.infer<typeof metadataBaseResponse>) => ({
  id: data["AVAIL:NASAID"],
  date: data["AVAIL:DateCreated"],
  title: data["AVAIL:Title"],
  description: data["AVAIL:Description"],
  excerpt: data["AVAIL:Description508"],
  keywords: data["AVAIL:Keywords"],
  location: data["AVAIL:Location"],
  fileSize: data["File:FileSize"],
});

const metadataImageResponse = metadataBaseResponse.extend({
  "AVAIL:MediaType": z.literal("image"),
  "Composite:ImageSize": z.string().optional(),
});

const metadataVideoResponse = metadataBaseResponse.extend({
  "AVAIL:MediaType": z.literal("video"),
  "Composite:ImageSize": z.string().optional(),
  "QuickTime:TrackDuration": z.string().optional(),
});

const metadataAudioResponse = metadataBaseResponse.extend({
  "AVAIL:MediaType": z.literal("audio"),
  "Composite:Duration": z.string().optional(),
});

const metadataResponse = z
  .discriminatedUnion("AVAIL:MediaType", [
    metadataImageResponse,
    metadataVideoResponse,
    metadataAudioResponse,
  ])
  .transform((data) => {
    const base = transformBaseMetadata(data);

    if (data["AVAIL:MediaType"] === "video") {
      return {
        ...base,
        type: "video" as const,
        resolution: data["Composite:ImageSize"],
        duration: data["QuickTime:TrackDuration"],
      };
    }

    if (data["AVAIL:MediaType"] === "audio") {
      return {
        ...base,
        type: "audio" as const,
        duration: data["Composite:Duration"],
      };
    }

    return {
      ...base,
      type: "image" as const,
      resolution: data["Composite:ImageSize"],
    };
  });

const searchPageParams = z.object({
  query: z.string(),
  page: z.coerce.number().optional(),
  type: nasaMediaType.optional(),
});

export {
  assetResponse,
  metadataLocationResponse,
  metadataResponse,
  nasaMediaType,
  nasaSearchResponse,
  searchPageParams,
};
