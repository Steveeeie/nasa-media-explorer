import { searchHandler } from "./search";
import { assetHandler } from "./asset";
import { metadataHandler } from "./metadata";
import { mediaFileHandler } from "./media-file";

export const handlers = [
  searchHandler,
  assetHandler,
  metadataHandler,
  mediaFileHandler,
];
