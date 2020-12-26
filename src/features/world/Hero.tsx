import React from "react";
import styled from "@emotion/styled";
import { Coords } from "world.model";
import useStrictSelector from "utils/useStrictSelector";
import { RootState } from "store";
import Images from "assets/images";
import { useHeroMover } from "utils/heroMover";

const heroSizeInPx = 50;

const HeroDivEl = styled.div`
  border-radius: 5px;
  background-image: url(${Images.Steve});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 999;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: ${heroSizeInPx}px;
  height: ${heroSizeInPx}px;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: all ease-out 0.25s;
`;

export type HeroProps = {
  worldSize: Coords;
  canvasSize: { height: number; width: number };
};

function calcHeroPosInCanvas({ canvasSize, worldSize }: HeroProps) {
  const heroPos = useStrictSelector((state: RootState) => state.world.heroPos);

  if (!heroPos) return null;

  const xPos = (heroPos.x / worldSize.x) * canvasSize.width;
  const yPos = (heroPos.y / worldSize.y) * canvasSize.height;

  const itemSizeWidth = canvasSize.width / worldSize.x;
  const itemSizeHeight = canvasSize.height / worldSize.y;

  const normalizedXPos = xPos + itemSizeWidth / 2 - heroSizeInPx / 2;
  const normalizedYPos = yPos + itemSizeHeight / 2 - heroSizeInPx / 2;

  return {
    x: normalizedXPos,
    y: normalizedYPos,
  };
}

export const Hero: React.FC<HeroProps> = (props) => {
  const { canvasSize, worldSize } = props;

  if (!canvasSize || !worldSize) return null;

  const heroCanvasPos = calcHeroPosInCanvas(props);

  useHeroMover();

  return (
    heroCanvasPos && (
      <HeroDivEl
        style={{
          top: heroCanvasPos.y,
          left: heroCanvasPos.x,
          width: heroSizeInPx + "px",
          height: heroSizeInPx + "px",
        }}
      />
    )
  );
};
