import { http, HttpResponse } from "msw";

const assetHandler = http.get(
  "https://images-api.nasa.gov/asset/:nasaId",
  ({ params }) => {
    const { nasaId } = params;

    if (nasaId === "test-video-1") {
      return HttpResponse.json({
        collection: {
          items: [
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~orig.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS.srt",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~mobile.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~preview.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small.mp4",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large_1.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large_2.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large_3.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large_4.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~large_5.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb_1.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb_2.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb_3.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb_4.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~thumb_5.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium_1.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium_2.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium_3.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium_4.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~medium_5.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small_1.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small_2.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small_3.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small_4.jpg",
            },
            {
              href: "https://images-assets.nasa.gov/video/Orion_Artemis-I_b-roll_9_2021_FS/Orion_Artemis-I_b-roll_9_2021_FS~small_5.jpg",
            },
            {
              href: `https://images-assets.nasa.gov/video/${nasaId}/metadata.json`,
            },
          ],
        },
      });
    }

    if (nasaId === "test-audio-1") {
      return HttpResponse.json({
        collection: {
          version: "1.1",
          href: `https://images-api.nasa.gov/asset/${nasaId}`,
          items: [
            {
              href: "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~orig.mp3",
            },
            {
              href: "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~orig.mp3",
            },
            {
              href: "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~128k.m4a",
            },
            {
              href: "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~128k.mp3",
            },
            {
              href: "https://images-assets.nasa.gov/audio/Ep381_Commercial_Lunar_Tools_and_Science/Ep381_Commercial_Lunar_Tools_and_Science~64k.m4a",
            },
            {
              href: `https://images-assets.nasa.gov/audio/${nasaId}/metadata.json`,
            },
          ],
        },
      });
    }

    return HttpResponse.json({
      collection: {
        version: "1.1",
        href: `https://images-api.nasa.gov/asset/${nasaId}`,
        items: [
          {
            href: "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~orig.tif",
          },
          {
            href: "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~large.jpg",
          },
          {
            href: "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~medium.jpg",
          },
          {
            href: "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~small.jpg",
          },
          {
            href: "https://images-assets.nasa.gov/image/NHQ201803280012/NHQ201803280012~thumb.jpg",
          },
          {
            href: `https://images-assets.nasa.gov/image/${nasaId}/metadata.json`,
          },
        ],
      },
    });
  },
);

export { assetHandler };
