import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./services/movies";
import { filtersReducer } from "./features/filters/filtersSlice";
import { favoritesReducer } from "./features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
