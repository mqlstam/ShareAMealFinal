const responseFormatter = (req, res, next) => {
  const originalSend = res.send;

  res.send = (data) => {
    const formattedResponse = {
      status: res.statusCode,
      message: null,
      data: data || null,
    };

    // If the data is an instance of Error, handle it differently
    if (data instanceof Error) {
      formattedResponse.message = data.message;
      formattedResponse.data = null;
    }

    originalSend.call(res, formattedResponse);
  };

  next();
};

module.exports = responseFormatter;