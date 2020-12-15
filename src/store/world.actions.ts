import { createAction } from "@reduxjs/toolkit";
import { Coords, WorldTileCoords } from "world.model";

export const switchTileType = createAction<{ coords: WorldTileCoords }>(
  "SWITCH_TYPE"
);
export const updateWorldProperties = createAction<{
  worldSize: Coords;
}>("UPDATE_WORLD_PROPS");

export const moveHero = createAction<
  | {
      position: Coords;
    }
  | {
      vector: Coords;
    }
>("MOVE_HERO");

export const reset = createAction("RESET");
