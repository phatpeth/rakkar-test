export type TTimeRange =
  | "24h"
  | "7d"
  | "14d"
  | "30d"
  | "90d"
  | "180d"
  | "1y"
  | "Max";

export const timeRanges: TTimeRange[] = [
  "24h",
  "7d",
  "14d",
  "30d",
  "90d",
  "180d",
  "1y",
  "Max",
];
