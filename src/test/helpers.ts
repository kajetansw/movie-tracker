import { TEST_ID_ATTRIBUTE } from "./setup";

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
