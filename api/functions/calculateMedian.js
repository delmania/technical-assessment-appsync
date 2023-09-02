/**
 * Calculates the median by invoking the median lambda
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the median
 */
export function request(ctx) {
  // Update with custom logic or select a code sample.
  const { values } = ctx.stash;
  return {
    operation: "Invoke",
    payload: { values: values },
  };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
  const { mean } = ctx.prev.result;
  const median = ctx.result;
  const results = {
    median: median,
    mean: mean,
  };
  // Update with response logic
  return results;
}
