/**
 * Validation Schema Definitions
 * - defines schema for validating request body, params and queries
 */

export const loginUserValidationSchema = {
    email: {
        trim: true,
        isEmail: {
            errorMessage: 'Invalid email address.',
        },
    },
    password: {
        trim: true,
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: 'Password should be at least 8 characters',
        },
    },
};

export const registerUserValidationSchema = {
    username: {
        trim: true,
        notEmpty: {
            errorMessage: 'Username is required',
        },
    },
    ...loginUserValidationSchema,
};

export const addGameValidationSchema = {
    title: {
        trim: true,
        isString: {
            errorMessage: 'Title must be a string',
        },
        notEmpty: {
            errorMessage: 'Title is required',
        },
    },
    genre: {
        trim: true,
        isString: {
            errorMessage: 'Genre must be a string',
        },
    },
    platform: {
        trim: true,
        isString: {
            errorMessage: 'Platform must be a string',
        },
    },
    releaseYear: {
        trim: true,
        isInt: {
            options: {
                min: 1000,
                max: 9999,
            },
            errorMessage: 'Year must be a valid numeric.',
        },
    },
    description: {
        isString: {
            errorMessage: 'Description must be a string.',
        },
    },
};

export const updateGameValidationSchema = {
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid game ID.',
        },
    },
    ...Object.keys(addGameValidationSchema).reduce((acc, key) => {
        acc[key] = {
            optional: true,
            ...addGameValidationSchema[key],
        };
        return acc;
    }, {}),
};

export const deleteGameValidationSchema = {
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid game ID.',
        },
    },
};

export const getAllGamesValidationSchema = {
    ...Object.keys(addGameValidationSchema).reduce((acc, key) => {
        acc[key] = {
            in: ['query'],
            optional: true,
            ...addGameValidationSchema[key],
        };
        return acc;
    }, {}),
};
