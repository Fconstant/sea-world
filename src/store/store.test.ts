import test from "ava";
import { Actions, rootReducer, RootState } from ".";
import sleep from "utils/sleep";
import { configureStore, Store } from "@reduxjs/toolkit";

let store: Store<RootState>;

test.beforeEach(() => {
  // get a clean store ref
  store = configureStore({
    reducer: rootReducer,
  });
});

test(`test ${Actions.switchTileType.type} action`, async (t) => {
  // add a dirt tile on (1, 1)
  store.dispatch(
    Actions.switchTileType({
      coords: {
        tileType: "dirt",
        x: 1,
        y: 1,
      },
    })
  );

  // This would cause this function to be the last in the call stack and wait for the reducer to apply
  await sleep(1);

  t.deepEqual(store.getState().world.tileCoords, {
    "1": {
      "1": "dirt",
    },
  });
});

test(`test ${Actions.updateWorldProperties.type} action`, async (t) => {
  // add a dirt tile on (4, 4) which is the 5th row and 5th col
  store.dispatch(
    Actions.switchTileType({
      coords: {
        tileType: "dirt",
        x: 5,
        y: 5,
      },
    })
  );

  // set worldSize to be bellow 5x5
  store.dispatch(
    Actions.updateWorldProperties({
      worldSize: {
        x: 3,
        y: 3,
      },
    })
  );

  await sleep(1);

  const world = store.getState().world;
  t.deepEqual(world.worldSize, {
    x: 3,
    y: 3,
  });
  t.notDeepEqual(world.tileCoords, {
    "5": {
      "5": "dirt",
    },
  });
});

// This test should throw an Error
test(`should throw error when a out-of-bounds coord is provided`, (t) => {
  t.throws(() =>
    // add a dirt tile on (9, 9) which is the 10th row and 10th col
    store.dispatch(
      Actions.switchTileType({
        coords: {
          tileType: "dirt",
          x: 50,
          y: 50,
        },
      })
    )
  );
});
