import React from "react";
import styled from "@emotion/styled";

import DirtTexture from "assets/dirt_texture.jpeg";
import WaterTexture from "assets/water_texture.png";
import GrassTexture from "assets/grass_texture.jpg";
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
`;

export const WorldTile: React.FC<WorldTileProps> = (props) => {
  const whichImg =
    props.type === "dirt"
      ? DirtTexture
      : props.type === "grass"
      ? GrassTexture
      : WaterTexture;
  return (
    <Tile
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
