import { matchedData, validationResult } from 'express-validator';

/**
 * Validation Result Handling Middleware
 * - handles validation errors from checkSchema
 * - sanitizes data in request.body
 */

const checkValidation = (req, res, next) => {
    const result = validationResult(req);

    // handle validation errors
    if (!result.isEmpty()) {
        console.error({ errors: result.array() });
        return res.sendStatus(400);
    }

    // sanitize data
    req.body = matchedData(req);
    next();
};

export default checkValidation;
