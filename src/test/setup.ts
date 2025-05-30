import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup, configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-test",
});

afterEach(() => {
  cleanup();
});
