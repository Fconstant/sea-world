import test from "ava";
import { cloneDeep } from "lodash-es";
import { getIslandCount, CoordMap } from "./islandCounter";

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

let state: typeof initialState;

test.beforeEach(() => {
  state = cloneDeep(initialState);
});

test("initial island count to be 2", (t) => {
  const islandCount = getIslandCount(state);
  t.is(islandCount, 2);
});

test("modifying values should give only a single island", (t) => {
  state["2"]["2"] = "dirt";
  const islandCount = getIslandCount(state);
  t.is(islandCount, 1);
});
