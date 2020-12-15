import React from "react";
import configMockStore from "redux-mock-store";
import { RootState } from "store";
import { tileCoordMap, worldSize } from "./coordMapForTests";
import { Provider as ReduxProvider } from "react-redux";

import { render as rtlRender } from "@testing-library/react";

const mockStore = configMockStore<RootState>();
export const store = mockStore({
  world: { worldSize, tileCoords: tileCoordMap },
});

const TestProvider: React.FC = (props) => {
  return <ReduxProvider store={store}>{props.children}</ReduxProvider>;
};

export const renderWithStore = (ui: JSX.Element, options?: any) =>
  rtlRender(ui, { wrapper: TestProvider, ...options });
