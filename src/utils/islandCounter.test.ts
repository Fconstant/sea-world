import "@types/jest";
import getIslandCount, { CoordMap } from "./islandCounter";

describe("islandCounter", () => {
  /**
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
  const initialState: CoordMap = {
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
  test("initial island count to be 2", () => {
    const islandCount = getIslandCount(initialState);
    expect(islandCount).toBe(2);
  });
});
