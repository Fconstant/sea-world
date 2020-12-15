export interface Coords {
  x: number;
  y: number;
}

export interface WorldTileCoords extends Coords {
  tileType: "grass" | "dirt" | "water";
}

export type WorldTileType = WorldTileCoords["tileType"];
