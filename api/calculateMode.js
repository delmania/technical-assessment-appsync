/**
 * Sends a request to the attached data source
 * @param {import('@aws-appsync/utils').Context} ctx the context
 * @returns {*} the request
 */
export function request(ctx) {
    const { values } = ctx.stash;
    const countMap = {};
    let maxCount = 0;
    let modes = [];
  
    values.forEach(num => {
      countMap[num] = (countMap[num] || 0) + 1;
      if (countMap[num] > maxCount) {
        maxCount = countMap[num];
        modes = [num];
      } else if (countMap[num] === maxCount) {
        modes.push(num);
      }
    });
    
    // If there's values for the mode, simply return the first one.
    const mode = modes[0];
    return { payload: { mode } };
    }
  
  /**
   * Returns the resolver result
   * @param {import('@aws-appsync/utils').Context} ctx the context
   * @returns {*} the result
   */
  export function response(ctx) {
      const { mean, median } = ctx.prev.result;
      ctx.result.mean = mean;
      ctx.result.median = median;
      return ctx.result
  }
  