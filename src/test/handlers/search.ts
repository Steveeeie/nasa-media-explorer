import { http, HttpResponse } from "msw";

const searchHandler = http.get(
  "https://images-api.nasa.gov/search",
  ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");
    const mediaType = url.searchParams.get("media_type");

    if (mediaType === "video") {
      return HttpResponse.json({
        collection: {
          items: [
            {
              data: [
                {
                  nasa_id: "test-video-1",
                  title: `${query} Video 1 Title`,
                  description: `${query} Video 1 Description`,
                  date_created: "2026-01-01 00:00:00",
                  media_type: "video",
                },
              ],
              links: [
                {
                  href: "https://images-assets.nasa.gov/video/GSFC_20140421_EarthOrbit_m11525/GSFC_20140421_EarthOrbit_m11525~thumb.jpg",
                  rel: "preview",
                },
              ],
            },
            {
              data: [
                {
                  nasa_id: "test-video-2",
                  title: `${query} Video 2 Title`,
                  description: `${query} Video 2 Description`,
                  date_created: "2026-01-02 00:00:00",
                  media_type: "video",
                },
              ],
              links: [
                {
                  href: "https://images-assets.nasa.gov/video/Seeing Earth as Only NASA Can/Seeing Earth as Only NASA Can~thumb.jpg",
                  rel: "preview",
                },
              ],
            },
            {
              data: [
                {
                  nasa_id: "test-video-3",
                  title: `${query} Video 3s Title`,
                  description: `${query} Video 3 Description`,
                  date_created: "2026-01-03 00:00:00",
                  media_type: "video",
                },
              ],
              links: [
                {
                  href: "https://images-assets.nasa.gov/video/NHQ_2020_0423_NASA Science Live - Earth Day/NHQ_2020_0423_NASA Science Live - Earth Day~thumb.jpg",
                  rel: "preview",
                },
              ],
            },
          ],
          metadata: {
            total_hits: 50,
          },
        },
      });
    }

    if (mediaType === "audio") {
      return HttpResponse.json({
        collection: {
          items: [
            {
              data: [
                {
                  nasa_id: "test-audio-1",
                  title: `${query} Audio 1 Title`,
                  description: `${query} Audio 1 Description`,
                  date_created: "2026-02-01 00:00:00",
                  media_type: "audio",
                },
              ],
            },
            {
              data: [
                {
                  nasa_id: "test-audio-2",
                  title: `${query} Audio 2 Title`,
                  description: `${query} Audio 2 Description`,
                  date_created: "2026-02-02 00:00:00",
                  media_type: "audio",
                },
              ],
            },
            {
              data: [
                {
                  nasa_id: "test-audio-3",
                  title: `${query} Audio 3 Title`,
                  description: `${query}  Audio 3 Description`,
                  date_created: "2026-02-03 00:00:00",
                  media_type: "audio",
                },
              ],
            },
          ],
          metadata: {
            total_hits: 50,
          },
        },
      });
    }

    return HttpResponse.json({
      collection: {
        items: [
          {
            data: [
              {
                nasa_id: "test-image-1",
                title: `${query} Image 1 Title`,
                description: `${query} Image 1 Description`,
                date_created: "2026-03-01 00:00:00",
                media_type: "image",
              },
            ],
            links: [
              {
                href: "https://images-assets.nasa.gov/image/PIA00342/PIA00342~thumb.jpg",
                rel: "preview",
              },
            ],
          },
          {
            data: [
              {
                nasa_id: "test-image-2",
                title: `${query} Image 2 Title`,
                description: `${query} Image 2 Description`,
                date_created: "2026-03-02 00:00:00",
                media_type: "image",
              },
            ],
            links: [
              {
                href: "https://images-assets.nasa.gov/image/PIA00123/PIA00123~thumb.jpg",
                rel: "preview",
              },
            ],
          },
          {
            data: [
              {
                nasa_id: "test-image-3",
                title: `${query} Image 3 Title`,
                description: `${query}  Image 3 Description`,
                date_created: "2026-03-03 00:00:00",
                media_type: "image",
              },
            ],
            links: [
              {
                href: "https://images-assets.nasa.gov/image/PIA01967/PIA01967~thumb.jpg",
                rel: "preview",
              },
            ],
          },
        ],
        metadata: {
          total_hits: 50,
        },
      },
    });
  }
);

export { searchHandler };
