export const handler = async (event) => {
  
    const { values } = event;
    
    values.sort((a,b) => a-b);
    
      const middle = Math.floor(values.length / 2);
  
      let median;
      if (values.length % 2 === 0) {
        median = (values[middle - 1] + values[middle]) / 2;
      } else {
        median = values[middle];
      }
     return median;
  };
  