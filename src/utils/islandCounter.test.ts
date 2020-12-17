import test from "ava";
import { cloneDeep } from "lodash-es";
import { getIslandCount } from "./islandCounter";

import { tileCoordMap } from "__testUtils/coordMapForTests";

/**
 * The map of the tileCoord can be seen on "__testUtils/coordMapForTests.ts"
 */

let state: typeof tileCoordMap;

test.beforeEach(() => {
  state = cloneDeep(tileCoordMap);
});

test("initial island count to be 2", (t) => {
  const islandCount = getIslandCount(state);
  t.is(islandCount, 2);
});

test("adding a new tile on the middle should give only a single island", (t) => {
  state["2"]["2"] = "dirt";

  /**
   * After operation, the expected state should be:
   * . . . . .
   * . D . D .
   * . G D G .
   * . . G . .
   * . . . . .
   *
   */
  const islandCount = getIslandCount(state);
  t.is(islandCount, 1);
});

test("island count should be zero after tiles within X=2 got pruned", (t) => {
  delete state["2"];

  /**
   * After deletion, the expected state should be:
   * . . . . .
   * . D . D .
   * . . . . .
   * . . G . .
   * . . . . .
   *
   */
  const islandCount = getIslandCount(state);
  t.is(islandCount, 0);
});
