import { CoordMap } from "utils/islandCounter";
import { Coords } from "world.model";

/*
 * Desired map:
 *
 * . . . . .
 * . D . D .
 * . G . G .
 * . . G . .
 * . . . . .
 *
 * (dot) = water
 * D = dirt
 * G = grass
 */

export const tileCoordMap: CoordMap = {
  "1": {
    "1": "dirt",
    "3": "dirt",
  },
  "2": {
    "1": "grass",
    "3": "dirt",
  },
  "3": {
    "2": "grass",
  },
};

export const worldSize: Coords = {
  x: 5,
  y: 5,
};
