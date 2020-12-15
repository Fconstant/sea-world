import React from "react";
import styled from "@emotion/styled";

import Images from "assets/images";

import { Card } from "components/Card";

export type WorldTileProps = {
  type?: "dirt" | "grass" | "water";
  onSwitchType?: () => void;
};

const Tile = styled(Card)`
  height: 100%;
  width: 100%;
  cursor: pointer;
  text-align: center;
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  z-index: 1;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
  &:active {
    transform: scale(1);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
  }
`;

export const WorldTile: React.FC<WorldTileProps> = (props) => {
  const whichImg =
    props.type === "dirt"
      ? Images.DirtTexture
      : props.type === "grass"
      ? Images.GrassTexture
      : Images.WaterTexture;
  return (
    <Tile
      data-testid={`texture:${props.type}`}
      style={{
        backgroundImage: `url(${whichImg})`,
      }}
      onClick={(e) => {
        e.preventDefault();
        props.onSwitchType && props.onSwitchType();
      }}
    ></Tile>
  );
};

WorldTile.defaultProps = {
  type: "water",
};
