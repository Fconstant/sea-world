import React from "react";
import styled from "@emotion/styled";
import { WorldStats } from "./WorldStats";
import { Card } from "components/Card";
import { Row } from "components/Flex";
import { WorldSizePanel } from "./WorldSizePanel";

import logoImg from "assets/logo.png";

const Container = styled(Row)`
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
`;

const CardContainer = styled(Card)`
  align-items: center;
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  height: auto;
  align-self: center;
`;

export const Controls: React.FC = () => {
  return (
    <Container>
      <Logo src={logoImg} />
      <CardContainer>
        <WorldSizePanel />
      </CardContainer>
      <CardContainer>
        <WorldStats />
      </CardContainer>
    </Container>
  );
};
