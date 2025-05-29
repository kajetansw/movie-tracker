import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  query: string;
  page: number;
}

const initialState: FiltersState = {
  query: "",
  page: 1,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = initialState.page;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  selectors: {
    selectQuery: (state) => state.query,
    selectPage: (state) => state.page,
  },
});

export const filtersActions = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

export const filtersSelectors = filtersSlice.selectors;
