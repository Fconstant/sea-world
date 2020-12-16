import React from "react";
import { RootState } from "store";
import { getIslandCount } from "utils/islandCounter";
import styled from "@emotion/styled";
import useStrictSelector from "utils/useStrictSelector";

const Container = styled.div`
  position: fixed;
  top: 5;
  right: 5;
`;

export const WorldStats: React.FC = () => {
  const coords = useStrictSelector(
    (state: RootState) => state.world.tileCoords
  );

  const islandCount = getIslandCount(coords);

  return <p>{islandCount}</p>;
};
