import { describe, expect, it } from "vitest";
import { getYear } from "../getYear";

describe("getYear", () => {
  it("should return the year from a date string", () => {
    expect(getYear("2023-01-01")).toBe("2023");
    expect(getYear("2020/12/25")).toBe("2020");
    expect(getYear("2019-07-04T12:00:00")).toBe("2019");
  });

  it("should handle invalid dates", () => {
    expect(getYear("invalid-date")).toBe("");
  });
});
