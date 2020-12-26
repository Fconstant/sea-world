import React, { useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { WorldTile } from "./WorldTile";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { get as lodashGet } from "lodash-es";
import { Actions } from "store";
import { Coords, WorldTileType } from "world.model";
import useStrictSelector from "utils/useStrictSelector";
import { Hero } from "./Hero";

export type WorldCanvasProps = {
  enabled?: boolean;
};

const WorldGrid = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
`;

const TileRow = styled.tr`
  margin: 0;
  padding: 0;
`;

const TileColumn = styled.td`
  padding: 5px;
`;

const tilesEnum: WorldTileType[] = ["water", "dirt", "grass"];

const cycleTileType = (current: WorldTileType) =>
  tilesEnum[(tilesEnum.findIndex((c) => c === current) + 1) % tilesEnum.length];

export const WorldCanvas: React.FC<WorldCanvasProps> = () => {
  const worldSize = useStrictSelector(
    (state: RootState) => state.world.worldSize
  );
  const coords = useStrictSelector(
    (state: RootState) => state.world.tileCoords
  );
  const dispatch = useDispatch();

  const onSwichType = (itemCoord: Coords) => () => {
    const type = lodashGet(coords, [itemCoord.x, itemCoord.y]) ?? "water";
    const action = Actions.switchTileType({
      coords: {
        ...itemCoord,
        tileType: cycleTileType(type),
      },
    });
    dispatch(action);
  };

  const worldGridRef = useRef<HTMLDivElement>(null);
  const worldCanvasSize = useMemo(
    () =>
      worldGridRef.current && {
        height: worldGridRef.current.offsetHeight,
        width: worldGridRef.current.offsetWidth,
      },
    [worldGridRef.current?.offsetHeight, worldGridRef.current?.offsetWidth]
  );

  return (
    <WorldGrid ref={worldGridRef}>
      <Table>
        <tbody>
          {Array(worldSize.y)
            .fill(0)
            .map((_, yCoord) => (
              <TileRow key={`world_row:${yCoord}`}>
                {Array(worldSize.x)
                  .fill(0)
                  .map((_, xCoord) => {
                    const type = lodashGet(coords, [xCoord, yCoord]);
                    return (
                      <TileColumn
                        data-testid={`tile:${xCoord}:${yCoord}`}
                        key={`world_col:${xCoord}`}
                      >
                        <WorldTile
                          onSwitchType={onSwichType({ x: xCoord, y: yCoord })}
                          type={type}
                        />
                      </TileColumn>
                    );
                  })}
              </TileRow>
            ))}
        </tbody>
      </Table>
      {worldCanvasSize && (
        <Hero worldSize={worldSize} canvasSize={worldCanvasSize} />
      )}
    </WorldGrid>
  );
};
