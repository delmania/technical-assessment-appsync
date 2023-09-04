/**
 * Calculates the mode of a list of numbers.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the  mode
 */
export function request(ctx) {
  const { values } = ctx.stash;
  let mode = 0;
  if (values == null || values.length == 0) {
    return { payload: { mode } };
  }
  const countMap = {};
  let maxCount = 0;
  let modes = [];

  values.forEach((num) => {
    countMap[num] = (countMap[num] || 0) + 1;
    if (countMap[num] > maxCount) {
      maxCount = countMap[num];
      modes = [num];
    } else if (countMap[num] === maxCount) {
      modes.push(num);
    }
  });

  // If there's multiple values for the mode, simply return the first one.
  mode = modes[0];
  return { payload: { mode } };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
  // Similar to the mean and median functions, we need to retrieve the previous
  // results and store them into the results. 
  const { mean, median } = ctx.prev.result;
  ctx.result.mean = mean;
  ctx.result.median = median;
  return ctx.result;
}
