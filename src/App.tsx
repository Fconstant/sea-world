import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import styled from "@emotion/styled";
import { WorldCanvas } from "components/WorldCanvas";

const Container = styled.div`
  text-align: center;
  height: 100vh;
`;

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <WorldCanvas />
      </Container>
    </Provider>
  );
};

export default App;
