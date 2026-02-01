import { z } from "zod";
import { nasaMediaType, nasaSearchResponse } from "@/schema";

export type NASASearchResponse = z.infer<typeof nasaSearchResponse>;

export type NasaMediaType = z.infer<typeof nasaMediaType>;
