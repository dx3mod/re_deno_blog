import { BaseBlogSettings } from "../deps.ts";

export type BlogSettings = BaseBlogSettings & {
  custom?: {
    indexPage?: {
      splitLine?: boolean;
    };
  };
};
