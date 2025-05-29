import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoritesState {
  moviesIds: number[];
}

const FAVORITES_STORAGE_KEY = "movie-tracker::favorites";

const initialState: FavoritesState = {
  moviesIds: [],
};

const getLocalStorageFavorites = () => {
  const rawStorageItem = localStorage.getItem(FAVORITES_STORAGE_KEY);

  return rawStorageItem
    ? (JSON.parse(rawStorageItem) as FavoritesState)
    : initialState;
};

const setLocalStorageFavorites = (state: FavoritesState) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state));
};

const hasLocalStorageFavorites = () =>
  !!localStorage.getItem(FAVORITES_STORAGE_KEY);

if (!hasLocalStorageFavorites()) {
  setLocalStorageFavorites(initialState);
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getLocalStorageFavorites(),
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      const currentIds = state.moviesIds;
      const targetId = action.payload;

      let newMoviesIds: number[] = [];

      if (currentIds.includes(targetId)) {
        newMoviesIds = state.moviesIds.filter((id) => id !== action.payload);
      } else {
        newMoviesIds = Array.from(
          new Set([...state.moviesIds, action.payload]),
        );
      }

      state.moviesIds = newMoviesIds;
      setLocalStorageFavorites({
        moviesIds: newMoviesIds,
      });
    },
  },
  selectors: {
    ids: (state) => state.moviesIds,
  },
});

export const favoritesActions = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const favoritesSelectors = favoritesSlice.selectors;
