import { createReducer } from "@reduxjs/toolkit";
import { Coords, WorldTileType } from "world.model";
import { unset, mapValues, pickBy, identity, isEmpty, get } from "lodash-es";
import {
  moveHero,
  reset,
  switchTileType,
  updateWorldProperties,
} from "./world.actions";

export interface WorldState {
  worldSize: Coords;
  tileCoords: {
    [coordX: string]: {
      [coordY: string]: WorldTileType;
    };
  };
  heroPos?: Coords;
}

export const initialState: WorldState = {
  worldSize: {
    x: 16,
    y: 8,
  },
  tileCoords: {},
};
export class CoordsError extends Error {
  constructor(cardinal: "x" | "y", val: number) {
    super(
      `Coordinate value for ${cardinal} axis provided is out of bounds: ${val}`
    );
  }
}

export const reducer = createReducer(initialState, (builder) =>
  builder

    .addCase(switchTileType, (state, action) => {
      const {
        coords: { x, y, tileType },
      } = action.payload;

      if (x > state.worldSize.x - 1) {
        throw new CoordsError("x", x);
      }

      if (y > state.worldSize.y - 1) {
        throw new CoordsError("y", y);
      }

      if (tileType == "water") {
        unset(state.tileCoords, [x, y]);
        if (state.heroPos && state.heroPos.x === x && state.heroPos.y === y) {
          // remove our hero on position aswell
          delete state.heroPos;
        }
      } else {
        if (isEmpty(state.tileCoords)) {
          // create a new hero on position
          state.heroPos = {
            x,
            y,
          };
        }
        if (!state.tileCoords[x]) {
          state.tileCoords[x] = {};
        }
        state.tileCoords[x][y] = tileType;
      }
    })

    .addCase(updateWorldProperties, (state, action) => {
      const worldSize = action.payload.worldSize;

      // remove out of bounds tileCoords
      const prunedTileCoords = pickBy(
        mapValues(state.tileCoords, (ycoordVal, x) => {
          if (parseInt(x) > worldSize.x - 1) return undefined;
          return pickBy(
            mapValues(ycoordVal, (type, y) =>
              parseInt(y) <= worldSize.y - 1 ? type : undefined
            ),
            identity
          );
        }),
        identity
      ) as WorldState["tileCoords"];

      return {
        heroPos: state.heroPos,
        tileCoords: prunedTileCoords,
        worldSize,
      };
    })

    .addCase(moveHero, (state, action) => {
      let projectedPos: Coords | undefined;
      let targetTile: WorldTileType | undefined;

      if ("vector" in action.payload && state.heroPos) {
        const { x, y } = action.payload.vector;
        const heroPos = state.heroPos;

        projectedPos = {
          x: heroPos.x + x,
          y: heroPos.y + y,
        };
        targetTile = get(state.tileCoords, [projectedPos.x, projectedPos.y]);
      }
      if ("position" in action.payload) {
        projectedPos = action.payload.position;
        targetTile = get(state.tileCoords, [projectedPos.x, projectedPos.y]);
      }

      if (targetTile && projectedPos && targetTile !== "water") {
        state.heroPos = projectedPos;
      }
    })

    .addCase(reset, () => initialState)
);

export default reducer;
