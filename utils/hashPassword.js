import bcrypt from 'bcrypt';

/**
 * BCrypt Utils
 * - handles password hashing
 * - handles password verification
 */

const saltRounds = 10;

export const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

export const checkPassword = (plain, hashed) => {
    return bcrypt.compare(plain, hashed);
};
