import { Site } from "./sites";

export type TripPlan = {
  Days: number;
  Location: string;
  TSP: Site[][];
  Types: string;
};
