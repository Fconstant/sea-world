import React, { useEffect, useRef, useState } from "react";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Row } from "components/Flex";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash-es";
import { Coords } from "world.model";
import { Actions } from "store";
import { RootState } from "store";

const thumbCss = css`
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: #222;
  border: solid #eee 2px;
  cursor: pointer;
`;

const RangeStyled = styled.input`
  appearance: none;
  -webkit-appearance: none;
  background: #bbb;
  border-radius: 4px;
  height: 10px;
  width: 200px;
  margin: 8px;
  outline: none;
  flex-grow: 1;
  &::-webkit-slider-thumb {
    ${thumbCss}
  }
  &::-moz-range-thumb {
    ${thumbCss}
  }
`;

const RangeCounter = styled.div`
  font-size: 24px;
  width: 50px;
`;

const RangeLabel = styled.div`
  font-size: 24px;
  width: 100px;
`;

const Range: React.FC<{
  value: number;
  label: string;
  max: number;
  onChange?: (val: number) => void;
}> = (props) => {
  return (
    <Row style={{ alignItems: "center", height: "50px" }}>
      <RangeLabel>{props.label}</RangeLabel>
      <RangeStyled
        type="range"
        onChange={(e) => {
          e.preventDefault();
          props.onChange && props.onChange(parseInt(e.target.value));
        }}
        min="1"
        max={props.max}
        step="1"
        value={props.value}
      />
      <RangeCounter>{props.value}</RangeCounter>
    </Row>
  );
};

export const WorldSizePanel: React.FC = () => {
  const worldSizeState = useSelector(
    (state: RootState) => state.world.worldSize
  );
  const [worldSize, setWorldSize] = useState(worldSizeState);

  const onChange = (axis: "x" | "y") => (val: number) => {
    setWorldSize({
      ...worldSize,
      [axis]: val,
    });
  };

  const dispatch = useDispatch();
  const firstDebounce = useRef(true);
  const debounced = useRef(
    debounce((worldSize: Coords) => {
      dispatch(
        Actions.updateWorldProperties({
          worldSize,
        })
      );
    }, 2000)
  );
  useEffect(() => {
    // This was created to debounced not be called at the first time
    if (!firstDebounce.current) {
      debounced.current(worldSize);
    }
    firstDebounce.current = false;
  }, [worldSize.x, worldSize.y]);

  return (
    <>
      <Range
        label="X axis"
        value={worldSize.x}
        max={20}
        onChange={onChange("x")}
      />
      <Range
        label="Y axis"
        value={worldSize.y}
        max={20}
        onChange={onChange("y")}
      />
    </>
  );
};
