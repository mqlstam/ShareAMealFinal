const responseFormatter = (req, res, next) => {
  console.log('responseFormatter middleware executed'); // Log statement
  // Save the original res.json method
  const originalJson = res.json;
  // Override res.json method
  res.json = (data) => {
    console.log('Formatting response'); // Log statement
    // Create a formatted response object
    const formattedResponse = {
      status: res.statusCode,
      message: null,
      data: null,
    };
    // If the data is an instance of Error, handle it differently
    if (data instanceof Error) {
      formattedResponse.message = data.message;
    } else if (typeof data === 'object' && data !== null) {
      // Check if data already has a message and data property
      if (data.message && data.data) {
        formattedResponse.message = data.message;
        formattedResponse.data = data.data;
      } else if (data.message) {
        // If data has a message property, use it as the message
        formattedResponse.message = data.message;
      } else {
        // Assume the data object itself is the response data
        formattedResponse.data = data;
      }
    } else if (typeof data === 'string') {
      // If data is a string, treat it as a message
      formattedResponse.message = data;
    }
    // Call the original res.json method with the formatted response
    originalJson.call(res, formattedResponse);
  };
  next();
};

module.exports = responseFormatter;
