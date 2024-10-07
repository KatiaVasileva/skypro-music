import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { trackReducer } from "./features/trackSlice";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { userReducer } from "./features/userSlice";
import { filterReducer } from "./features/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      track: trackReducer,
      user: userReducer,
      filter: filterReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
