import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import styled from "@emotion/styled";
import { WorldCanvas } from "features/world";
import { Controls } from "features/controls";

const Container = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #222;
`;

const ControlsContainer = styled.div`
  height: auto;
  width: 100%;
  margin-bottom: 8px;
`;

const WorldContainer = styled.div`
  margin-top: 4px;
  flex-grow: 5;
  width: 100%;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <ControlsContainer>
          <Controls />
        </ControlsContainer>
        <WorldContainer>
          <WorldCanvas />
        </WorldContainer>
      </Container>
    </Provider>
  );
};

export default App;
