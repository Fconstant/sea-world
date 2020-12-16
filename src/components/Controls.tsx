import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { WorldStats } from "./WorldStats";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { debounce } from "lodash-es";
import { Coords } from "world.model";
import { Actions } from "store/world.reducer";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled(Row)`
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const thumbCss = css`
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 25px;
  background: #222;
  border: solid #829 2px;
  cursor: pointer;
`;

const RangeStyled = styled.input`
  appearance: none;
  -webkit-appearance: none;
  background: linear-gradient(45deg, #489, #829, #c49);
  border-radius: 10px;
  width: 100%;
  height: 8px;
  margin: 8px;
  outline: none;
  &::-webkit-slider-thumb {
    ${thumbCss}
  }
  &::-moz-range-thumb {
    ${thumbCss}
  }
`;

const RangeCounter = styled.div`
  border-radius: 20px;
  height: 20px;
  width: 20px;
  margin: 8px;
  background-color: linear-gradient(45deg, #489, #829, #c49);
`;

const Range: React.FC<{
  value: number;
  label: string;
  max: number;
  onChange?: (val: number) => void;
}> = (props) => {
  return (
    <Row>
      <label>{props.label}</label>
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

export const Controls: React.FC = () => {
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
  const debounced = useRef(
    debounce((worldSize: Coords) => {
      dispatch(
        Actions.updateWorldProperties({
          worldSize,
          cleanIt: false,
        })
      );
    }, 2000)
  );
  useEffect(() => debounced.current(worldSize), [worldSize]);

  return (
    <Container>
      <Card>
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
      </Card>
      <WorldStats />
    </Container>
  );
};
