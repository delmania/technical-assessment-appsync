import { request, response } from "../api/functions/calculateMode.js";
import assert from "assert";

describe("Calculations", function () {
  it("Should calculate the mode", function () {
    const expectedMode = 1;
    const values = [2, 4, 5, 7, 1, 8, 1];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should handle a single element", function () {
    const expectedMode = 1;
    const values = [1];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should handle an empty array", function () {
    const expectedMode = 0;
    const values = [];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should handle an calculate the mode from multiple repeats", function () {
    const expectedMode = 2;
    const values = [3, 2, 3, 2, 3, 2, 2];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should handle an calculate the mode from an unsorted array", function () {
    const expectedMode = 1;
    const values = [5, 6, 7, 1, 3, 2, 1];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should return the first value in a multimodal array", function () {
    const expectedMode = 2;
    const values = [2, 5, 6, 7, 1, 3, 2, 1];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should return the first value in a multimodal array", function () {
    const expectedMode = 1;
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should return the mode", function () {
    const expectedMode = 10;
    const values = [10, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });

  it("Should return the mode", function () {
    const expectedMode = 10;
    const values = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const ctx = { stash: { values: values } };
    const result = request(ctx);
    const { mode } = result.payload;
    assert.equal(mode, expectedMode);
  });


  it("Should transform the response", function () {
    const expectedMean = 1;
    const expectedMedian = 2;
    const expectedMode = 3;
    const ctx = {
      result: {
        mode: expectedMode,
      },
      prev: {
        result: {
          mean: expectedMean,
          median: expectedMedian,
        },
      },
    };
    const result = response(ctx);
    var { mean, median, mode } = result;
    assert.equal(mean, expectedMean);
    assert.equal(median, expectedMedian);
    assert.equal(mode, expectedMode);
  });
});
