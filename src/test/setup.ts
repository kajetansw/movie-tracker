import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup, configure } from "@testing-library/react";

export const TEST_ID_ATTRIBUTE = "data-test";

configure({
  testIdAttribute: TEST_ID_ATTRIBUTE,
});

afterEach(() => {
  cleanup();
});
