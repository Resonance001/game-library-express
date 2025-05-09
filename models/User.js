import mongoose from 'mongoose';
import { hashPassword } from '../utils/hashPassword.js';

/**
 * User Model Definition
 * - username and email must be unique
 * - email is indexed to optimize login
 */

const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});

/**
 * Pre-save Hook
 * - hash user password before saving to database
 */

UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await hashPassword(this.password);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema);
