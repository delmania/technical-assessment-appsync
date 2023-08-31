/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {    
    const { values } = ctx.stash;
    const sum = values.reduce((acc, num) => acc + num, 0);
    const mean = sum / values.length;
    return { payload: { mean } };
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the result
 */
export function response(ctx) {
    // Update with response logic
    return ctx.result
}
