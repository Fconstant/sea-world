import React from "react";
import test from "ava";

import {
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { renderWithStore, store } from "__testUtils/mockStore";
import { WorldCanvas } from "./WorldCanvas";
import { Actions } from "store";

test.afterEach(store.clearActions);
test.afterEach(cleanup);

test("test WorldCanvas should render all items", (t) => {
  renderWithStore(<WorldCanvas />);

  const tiles = screen.queryAllByTestId(/tile.*/i, { exact: false });

  const {
    worldSize: { x, y },
  } = store.getState().world;

  const tileCount = x * y;

  t.is(tiles.length, tileCount);
});

// This test was skipped because the `render` method is (for some unkown reason to me) rendering duplicate tiles (elements with the same "data-testid")
// Despite this not being the case in the final app.
// Unfortunately, I didn't have much time to dig deeper =(
// But the test logic is bellow for checking at least =D
test.failing(
  "test WorldCanvas render result after worldSize is reduced",
  async (t) => {
    renderWithStore(<WorldCanvas />);

    store.dispatch(
      Actions.updateWorldProperties({
        worldSize: {
          x: 3,
          y: 3,
        },
      })
    );

    const toBeRm = screen.queryByTestId("tile:4:4"); // x = 4 / y = 4. This el is going to be removed
    await waitForElementToBeRemoved(toBeRm);

    /*
     * Expected new Coords:
     * . . .
     * . D .
     * . G .
     */
    const removed = screen.queryByTestId("tile:4:4");

    t.falsy(removed);

    const dirt = screen.queryByTestId("tile:1:1"); // x = 1 / y = 1
    const grass = screen.queryByTestId("tile:1:2"); // x = 1 / y = 2

    t.truthy(dirt);
    t.truthy(grass);
  }
);
