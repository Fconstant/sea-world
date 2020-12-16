import React from "react";
import styled from "@emotion/styled";

import DirtTexture from "../assets/dirt_texture.jpeg";
import WaterTexture from "../assets/water_texture.jpg";
import GrassTexture from "../assets/grass_texture.jpg";
import { Card } from "./Card";

export type WorldTileProps = {
  type?: "dirt" | "grass" | "water";
  onSwitchType?: () => void;
};

const Tile = styled(Card)`
  height: 100%;
  width: 100%;
  cursor: pointer;
  text-align: center;
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
        background: `url(${whichImg})`,
      }}
      onClick={(e) => {
        e.preventDefault();
        props.onSwitchType?.call(this);
      }}
    ></Tile>
  );
};

WorldTile.defaultProps = {
  type: "water",
};
