import { expect } from "vitest";
import { removeHtmlTags } from "../src/helpers";

describe("removeHtmlTags", () => {
  it("should remove html tags from given test", () => {
    const baseString = "Hello there";

    const htmlString = `<div>${baseString}</div>`;
    expect(removeHtmlTags(htmlString)).toBe(baseString);
  });
});
