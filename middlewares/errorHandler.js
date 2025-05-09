import { duplicateErrorHandler } from '../utils/duplicateErrorHandler.js';

/**
 * Error Handling Middleware
 * - checks for conflict on unique fields
 * - returns standard 500 error code otherwise
 */

const errorHandler = (err, req, res, next) => {
    const duplicateError = duplicateErrorHandler(err);

    // handle duplicates and return conflict status
    if (duplicateError) {
        return res.status(409).json({ message: duplicateError });
    }

    // standard error code
    return res.sendStatus(500);
};

export default errorHandler;
