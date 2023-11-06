import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  console.log(`🚀 [ERROR] `, err);
  let error = { ...err };
  error.message = err.message;
  if (err.code === 11000) {
    const message = 'Duplicate field value enter';
    error = new ErrorResponse(message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message);
  }

  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Server error',
  });
};

export default errorHandler;
