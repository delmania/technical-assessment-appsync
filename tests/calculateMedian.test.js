import { handler } from "../api/calculate_median_lambda/main.mjs";
import { response } from "../api/functions/calculateMedian.js";
import assert from "assert";

describe("Calculations", function () {
  it("Should pick the middle element in an odd length array", async function () {
    const expectedMedian = 4;
    const values = [2, 4, 5, 7, 1, 8, 1];
    const event = { values: values };
    const median = await handler(event);
    assert.equal(median, expectedMedian);
  });
  
 it("Should average the two middle elements in an even length array.", async function () {
      const expectedMedian = 4.5;
      const values = [5, 6, 1, 2, 10, 8, 3, 4];
      const event = { values: values };
      const median = await handler(event);
      assert.equal(median, expectedMedian);
    });

  it("Should handle a single element", async function () {
    const expectedMedian = 1;
    const values = [1];
    const event = { values: values };
    const median = await handler(event);
    assert.equal(median, expectedMedian);
  });

  it("Should handle an empty array", async function () {
    const expectedMedian = 0;
    const values = [];
    const event = { values: values };
    const median = await handler(event);
    assert.equal(median, expectedMedian);
  });

  it("Should transform the results correctly", function () {
    const expectedMedian = 4;
    const expectedMean = 3;
    const ctx = {
      prev: {
        result: {
          mean: expectedMean,
        },
      },
      result: expectedMedian,
    };

    const result = response(ctx);
    const { mean, median } = result;
    assert.equal(mean, expectedMean);
    assert.equal(median, expectedMedian);
  });
});
