/**
 * Calculates the mean.
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} The mean
 */
export function request(ctx) {
  const { values } = ctx.stash;
  let mean = 0;
  if (values != null && values.length > 0) {
    const sum = values.reduce((acc, num) => acc + num, 0);
    mean = sum / values.length;
  }
  return { payload: { mean } };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
  // Update with response logic
  return ctx.result;
}
