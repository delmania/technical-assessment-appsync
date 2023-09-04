/**
 * Calculates the mean of a list of numbers.
 * @param {import('@aws-appsync/utils').Context} ctx the context, where the list is in the stash.
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
 * Returns the resolver result.  
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
  // No modification needed, and the result from the request is 
  // mapped to mean by the runtime.
  return ctx.result;
}
