import { configureStore } from "@reduxjs/toolkit";
import { TEST_ID_ATTRIBUTE } from "./setup";
import { favoritesReducer } from "@/store/features/favorites/favoritesSlice";
import { createMemoryRouter, RouterProvider } from "react-router";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { filtersReducer } from "@/store/features/filters/filtersSlice";

/*
 * SETUP
 */

interface Options {
  redux: {
    reducer: Parameters<typeof configureStore>[0]["reducer"];
  };
  router: {
    path: string;
  };
}

export const renderWithProviders = (
  component: React.ReactNode,
  options?: Options,
) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      filters: filtersReducer,
      ...options?.redux.reducer,
    },
  });

  const router = createMemoryRouter([
    {
      path: options?.router.path ?? "/",
      element: component,
    },
  ]);

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};

/*
 * QUERIES
 */

export const queryByTestIdStartingWith = (
  container: HTMLElement,
  id: string,
) => {
  const elements = container.querySelectorAll(`[${TEST_ID_ATTRIBUTE}]`);
  return (
    Array.from(elements).find((element) =>
      element.getAttribute(`${TEST_ID_ATTRIBUTE}`)?.startsWith(id),
    ) ?? null
  );
};

export const queryAllByTestIdStartingWith = (
  container: HTMLElement,
  id: string,
) => {
  const elements = container.querySelectorAll(`[${TEST_ID_ATTRIBUTE}]`);
  return Array.from(elements).filter((element) =>
    element.getAttribute(`${TEST_ID_ATTRIBUTE}`)?.startsWith(id),
  );
};
