import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState } from "store/world.reducer";
import { RootState } from "store";

const mockStore = configureStore([]);

export const rootInitialState = {
  world: initialState,
};

export const renderWithRedux = (
  ui: JSX.Element,
  initialState: RootState = rootInitialState
) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    mockStore: store,
  };
};
