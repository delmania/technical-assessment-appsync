/**
 * Calculates the median of a list of numbers by invoking the median lambda
 * @param {import('@aws-appsync/utils').Context} ctx the context; the list is stored in the stash.
 * @returns {*} the median
 */
export function request(ctx) {  
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
  // The result from the lambda is just stored in the result field.
  // For proper processing, we need to retrieve the mean from the prev field and map
  // it to the mean field alongside the median.
  const { mean } = ctx.prev.result;
  const median = ctx.result;
  const results = {
    median: median,
    mean: mean,
  };
  // Update with response logic
  return results;
}
