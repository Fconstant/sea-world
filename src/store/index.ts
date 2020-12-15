import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import worldReducer from "./world.reducer";

export const rootReducer = combineReducers({
  world: worldReducer,
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import * as Actions from "./world.actions";
export { Actions };

export default store;
