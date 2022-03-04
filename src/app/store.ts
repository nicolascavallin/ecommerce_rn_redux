import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "./cart.reducer";
import catalogReducer from "./catalog.reducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    catalog: catalogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
