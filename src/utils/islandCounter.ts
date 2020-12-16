import { cloneDeep, get, isEmpty } from "lodash-es";
import { RootState } from "store";
import { Coords, WorldTileType } from "world.model";

export type CoordMap = RootState["world"]["tileCoords"];

const landEnum = ["grass", "dirt"];
const isLand = (tile?: WorldTileType) => tile && landEnum.includes(tile);

function extractTile(
  dir: "up" | "down" | "left" | "right",
  coord: Coords,
  map: CoordMap
) {
  const projectedXinDir =
    coord.x + (dir === "up" ? -1 : dir === "down" ? 1 : 0);
  const projectedYinDir =
    coord.y + (dir === "left" ? -1 : dir === "right" ? 1 : 0);

  const exists = isLand(
    get(map, [String(projectedXinDir), String(projectedYinDir)])
  );

  if (exists) {
    // delete because it's already used
    delete map[coord.x][coord.y];

    return {
      x: projectedXinDir,
      y: projectedYinDir,
    } as Coords;
  } else return null;
}

function findAdjacentTiles(coords: Coords, coordMap: CoordMap) {
  let adjacentCount = 0;

  const upTile = extractTile("up", coords, coordMap);
  if (upTile) {
    adjacentCount++;
    adjacentCount += findAdjacentTiles(upTile, coordMap);
  }

  const downTile = extractTile("down", coords, coordMap);
  if (downTile) {
    adjacentCount++;
    adjacentCount += findAdjacentTiles(downTile, coordMap);
  }

  const leftTile = extractTile("left", coords, coordMap);
  if (leftTile) {
    adjacentCount++;
    adjacentCount += findAdjacentTiles(leftTile, coordMap);
  }

  const rightTile = extractTile("right", coords, coordMap);
  if (rightTile) {
    adjacentCount++;
    adjacentCount += findAdjacentTiles(rightTile, coordMap);
  }

  return adjacentCount;
}

function extractTileNode(coordMap: CoordMap) {
  if (isEmpty(coordMap)) {
    return null;
  }

  let nodeX: string | undefined;
  let isNodeEmpty = false;
  do {
    nodeX = Object.keys(coordMap)[0];
    if (!nodeX) {
      return null;
    }

    if ((isNodeEmpty = isEmpty(coordMap[nodeX]))) {
      delete coordMap[nodeX];
    }
  } while (isNodeEmpty);

  const nodeY = Object.keys(coordMap[nodeX])[0];

  // remove node from coordMap
  delete coordMap[nodeX][nodeY];

  return {
    x: parseInt(nodeX),
    y: parseInt(nodeY),
  } as Coords;
}

export function getIslandCount(coordMap: CoordMap) {
  // it should be mutable so it will be cloned
  const clonedCoordMap: CoordMap = cloneDeep(coordMap);

  let islandCount = 0;

  let nodeCoords: Coords | null;
  while ((nodeCoords = extractTileNode(clonedCoordMap))) {
    const nodeCount = findAdjacentTiles(nodeCoords, clonedCoordMap);
    if (nodeCount > 0) {
      islandCount++;
    }
  }
  return islandCount;
}
