import { createAction, createReducer } from "@reduxjs/toolkit";
import { Coords, WorldTileCoords, WorldTileType } from "world.model";
import { set, unset, mapValues, pickBy, identity } from "lodash-es";

interface WorldState {
  worldSize: Coords;
  tileCoords: {
    [coordX: string]: {
      [coordY: string]: WorldTileType;
    };
  };
}

export const initialState: WorldState = {
  worldSize: {
    x: 16,
    y: 8,
  },
  tileCoords: {},
};

const switchTileType = createAction<{ coords: WorldTileCoords }>("SWITCH_TYPE");
const updateWorldProperties = createAction<{
  worldSize?: Coords;
  cleanIt?: boolean;
}>("UPDATE_WORLD_PROPS");

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
      } else {
        if (!state.tileCoords[x]) {
          state.tileCoords[x] = {};
        }
        state.tileCoords[x][y] = tileType;
      }
    })

    .addCase(updateWorldProperties, (state, action) => {
      if (action.payload?.cleanIt) {
        state = { ...initialState };
      }
      const worldSize = action.payload?.worldSize;
      console.log(worldSize);
      if (worldSize) {
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

        state.tileCoords = prunedTileCoords;
        state.worldSize = worldSize;
      }
    })
);

export const Actions = { switchTileType, updateWorldProperties };

export default reducer;
