/**
 * Starts the resolver execution; store the numbers list in the stash for access by 
 * the later functions
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the return value sent to the first AppSync function
 */
export function request(ctx) {
  const { values } = ctx.args;
  ctx.stash.values = values;
  return {};
}

/**
 * Returns the resolver result
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the return value of the last AppSync function response handler
 */
export function response(ctx) {
  return ctx.prev.result;
}
