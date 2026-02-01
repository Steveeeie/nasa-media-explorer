import { http, HttpResponse } from "msw";

const mediaFileHandler = http.get(
  "https://images-assets.nasa.gov/:type/:id/:file",
  () => new HttpResponse(),
);

export { mediaFileHandler };
