/*/
* Calculate the median of an array of numbers.
* @params: event The standard input object to a lambda.  The array is in the
* values object. 
*/
export const handler = async (event) => {
  const { values } = event;

  if (values == null || values.length == 0) {
    return 0;
  }

  values.sort((a, b) => a - b);

  const middle = Math.floor(values.length / 2);

  let median;
  if (values.length % 2 === 0) {
    median = (values[middle - 1] + values[middle]) / 2;
  } else {
    median = values[middle];
  }
  return median;
};
