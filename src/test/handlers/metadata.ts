import { http, HttpResponse } from "msw";

const metadataHandler = http.get(
  "https://images-assets.nasa.gov/:mediaType/:nasaId/metadata.json",
  ({ params }) => {
    const { nasaId, mediaType } = params;

    const baseMetadata = {
      "AVAIL:NASAID": nasaId,
      "AVAIL:DateCreated": "2024-01-01 12:00:00",
      "AVAIL:Title": `Test Title`,
      "AVAIL:Center": "Test Center",
      "AVAIL:Description": "Test Description",
      "AVAIL:Description508": "Test Short Description",
      "AVAIL:Keywords": ["Test Keyword 1", "Test Keyword 2"],
      "AVAIL:Location": "Test Location",
      "File:FileSize": "2.5 MB",
      "AVAIL:MediaType": mediaType,
    };

    if (mediaType === "video") {
      return HttpResponse.json({
        ...baseMetadata,
        "Composite:ImageSize": "1920x1080",
        "QuickTime:TrackDuration": "0:02:30",
      });
    }

    if (mediaType === "audio") {
      return HttpResponse.json({
        ...baseMetadata,
        "Composite:Duration": "0:03:45",
      });
    }

    return HttpResponse.json({
      ...baseMetadata,
      "Composite:ImageSize": "1920x1080",
    });
  }
);

export { metadataHandler };
