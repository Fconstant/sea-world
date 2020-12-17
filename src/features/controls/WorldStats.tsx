import React from "react";
import { RootState } from "store";
import { getIslandCount } from "utils/islandCounter";
import styled from "@emotion/styled";
import useStrictSelector from "utils/useStrictSelector";

const IslandCounter = styled.div`
  font-size: 24px;
`;

export const WorldStats: React.FC = () => {
  const coords = useStrictSelector(
    (state: RootState) => state.world.tileCoords
  );

  const islandCount = getIslandCount(coords);

  return (
    <IslandCounter>
      {islandCount
        ? `Number of islands on your World: ${islandCount}`
        : "No islands found on your World"}
    </IslandCounter>
  );
};
