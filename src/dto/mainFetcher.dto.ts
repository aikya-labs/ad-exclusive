import { BooleanSchemaDefinition } from "mongoose";

export interface MainFetcherDto {
  default?: boolean;
  status?: boolean;
  message?: string;
  click?: boolean;
  view?: boolean;
  imageUrl?: string;
  redirectUrl?: string;
  adId?: any;
}
