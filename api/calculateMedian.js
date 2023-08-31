/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    // Update with custom logic or select a code sample.
    const { values } = ctx.stash;    
    const middle = Math.floor(values.length / 2);

    let median;
    if (values.length % 2 === 0) {
      median = (values[middle - 1] + values[middle]) / 2;
    } else {
      median = values[middle];
    }
    return { payload: { median } };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    const { mean } = ctx.prev.result;
    // Update with response logic
    ctx.result.mean = mean;
    return ctx.result
}
