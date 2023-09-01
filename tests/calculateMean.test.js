import { request } from "../api/functions/calculateMean.js";
import assert from "assert";

describe("Calculations", function () {
  it("Should calculate the mean", function () {
    const expectedMean = 4;
    const ctx = { stash: { values: [2, 4, 5, 7, 1, 8, 1] } };
    const result = request(ctx);
    const { mean } = result.payload;
    assert.equal(mean, expectedMean);
  });

  it("Should handle a single element", function () {
    const expectedMean = 1;
    const ctx = { stash: { values: [1] } };
    const result = request(ctx);
    const { mean } = result.payload;
    assert.equal(mean, expectedMean);
  });

  it("Should handle an empty array", function () {
    const expectedMean = 0;
    const ctx = { stash: { values: [] } };
    const result = request(ctx);
    const { mean } = result.payload;
    assert.equal(mean, expectedMean);
  });
});
