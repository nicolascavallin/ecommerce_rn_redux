import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./store";
import { Product } from "./types";

const fetchCatalog = () =>
  fetch("https://amiiboapi.com/api/amiibo/?type=0x01")
    .then(res => res.json())
    .then(res => res);

export const fetchCatalogAsync = createAsyncThunk("catalog/fetch", async () => {
  const res = await fetchCatalog();
  const finalRes: Product[] = res.amiibo.map(
    (x: {
      image: string;
      tail: string;
      name: string;
      gameSeries: string;
      release: { eu: string };
    }) => ({
      image: x.image,
      id: x.tail,
      price: (Math.floor(Math.random() * 10000) + 100) * 10,
      title: x.name,
      brand: x.gameSeries,
      released: x.release.eu,
    }),
  );
  return finalRes;
});

export interface CatalogState {
  products: Product[];
  status: "idle" | "loading" | "done";
}

const initialState: CatalogState = {
  products: [],
  status: "idle",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCatalogAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchCatalogAsync.fulfilled, (state, action) => {
        state.status = "done";
        state.products = action.payload;
      });
  },
});

export const catalogSelector = (state: RootState) => state.catalog.products;
export const statusSelector = (state: RootState) => state.catalog.status;

export const loadCatalog = (): AppThunk => dispatch =>
  dispatch(fetchCatalogAsync());

export default catalogSlice.reducer;
