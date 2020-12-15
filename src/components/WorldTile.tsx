import React from "react";
import styled from "@emotion/styled";

import DirtTexture from "../assets/dirt_texture.jpeg";
import WaterTexture from "../assets/water_texture.jpg";
import GrassTexture from "../assets/grass_texture.jpg";

export type WorldTileProps = {
  type?: "dirt" | "grass" | "water";
  onSwitchType?: () => void;
};

const Tile = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 1px solid #333;
  text-align: center;
`;

const BgImg = styled.img`
  width: 100%;
  background-repeat: repeat;
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
        console.log("click");
        props.onSwitchType?.call(this);
      }}
    ></Tile>
  );
};

WorldTile.defaultProps = {
  type: "water",
};
