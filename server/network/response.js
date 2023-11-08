import ErrorResponse from '../utils/errorResponse.js';

const OPERATION_FAILED = 'OPERATION.FAILED';

export const success = (req, res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    error: false,
    message,
    data,
  });
};

export const error = (req, res, statusCode, message, error) => {
  try {
    console.log('[ERROR]', error);
    if (error) {
      if (error.errorInfo) {
        return res.status(statusCode).send({
          success: false,
          error: error.errorInfo.code,
          message: error.errorInfo.message,
        });
      } else {
        if (typeof error === 'object') {
          return res.status(error.statusCode).send({
            success: false,
            error: OPERATION_FAILED,
            message: error.message,
          });
        }

        return res.status(statusCode).send({
          success: false,
          error: OPERATION_FAILED,
          message: message,
        });
      }
    }
  } catch (err) {
    try {
      if (error) {
        switch (err.name) {
          case 'MongooseError':
            return res.status(statusCode).send({
              success: false,
              error: OPERATION_FAILED,
              message: error.message,
            });
          case 'ValidationError':
            return res.status(statusCode).send({
              success: false,
              error: OPERATION_FAILED,
              message: `${err._message} in the following keys: ${Object.keys(
                err.errors
              )}`,
            });
          case 'Error':
            return res.status(statusCode).send({
              success: false,
              error: OPERATION_FAILED,
              message: err.message,
            });
          default:
            return res.status(statusCode).send({
              success: false,
              error: OPERATION_FAILED,
              message: message,
            });
        }
      }
    } catch (ndErr) {
      return res.status(statusCode).send({
        success: false,
        error: OPERATION_FAILED,
        message: message,
      });
    }
  }
};

export const customError = (statusCode, message) =>
  new ErrorResponse(statusCode, message);
