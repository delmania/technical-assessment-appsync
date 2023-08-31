import request from '../api/calculateMean.js'

test("Calculates the mean correctly", () => {
    const expectedMean = 4;
    const ctx = { stash : {
        values:  [2, 4, 5, 7, 1, 8, 1]
    }}

    const result = request(ctx);
    const { mean } = result.payload
    expect(mean).toBe(expectedMean);
});

