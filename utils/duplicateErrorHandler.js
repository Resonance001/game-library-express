/**
 * Duplicate Error Handler Util
 * - handles custom message from duplicate key error returned by MongoDB
 */

export const duplicateErrorHandler = (error) => {
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];

        // handle unique fields from models
        const message = {
            email: 'Email is already registered.',
            username: 'Username is already taken.',
            title: 'Game is already added',
        };

        return message[field] || 'Conflict';
    }
};
