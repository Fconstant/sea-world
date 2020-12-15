import React from "react";
import styled from "@emotion/styled";
import { WorldTile } from "./WorldTile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { get as lodashGet, findIndex } from "lodash-es";
import { Actions } from "store/world.reducer";
import { Coords, WorldTileType } from "world.model";

export type WorldCanvasProps = {
  enabled?: boolean;
};

const WorldGrid = styled.table`
  width: 100%;
  height: 100%;
`;

const TileRow = styled.tr`
  margin: 0;
  padding: 0;
`;

const TileColumn = styled.td`
  margin: 0;
  padding: 0;
`;

const tilesEnum: WorldTileType[] = ["water", "dirt", "grass"];
const cycleTileType = (current: WorldTileType) =>
  tilesEnum[(tilesEnum.findIndex((c) => c === current) + 1) % tilesEnum.length];

export const WorldCanvas: React.FC<WorldCanvasProps> = (props) => {
  const worldSize = useSelector((state: RootState) => state.world.worldSize);
  const coords = useSelector((state: RootState) => state.world.tileCoords);
  const dispatch = useDispatch();

  const onSwichType = (itemCoord: Coords) => () => {
    const type = lodashGet(coords, [itemCoord.x, itemCoord.y]) ?? "water";
    const action = Actions.switchTileType({
      coords: {
        ...itemCoord,
        tileType: cycleTileType(type),
      },
    });
    console.log(action);
    dispatch(action);
  };

  return (
    <WorldGrid>
      {Array(worldSize.x)
        .fill(0)
        .map((_, i) => (
          <TileRow key={`world_row:${i}`}>
            {Array(worldSize.y)
              .fill(0)
              .map((_, j) => {
                const type = lodashGet(coords, [i, j]);
                return (
                  <TileColumn key={`world_tile:${j}`}>
                    <WorldTile
                      onSwitchType={onSwichType({ x: i, y: j })}
                      type={type}
                    />
                  </TileColumn>
                );
              })}
          </TileRow>
        ))}
    </WorldGrid>
  );
};
