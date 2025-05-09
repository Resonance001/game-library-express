import User from '../models/User.js';
import issueJwt from '../utils/issueJwt.js';

// Handle user registration
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({ message: 'Successfully registered user' });
    } catch (error) {
        console.error('Error registering user: ', error);
        next(error);
    }
};

// Handle user login and token generation
const login = async (req, res, next) => {
    try {
        const token = issueJwt(req.user);
        res.status(200).json(token);
    } catch (error) {
        console.error('Error logging in: ', error);
        next(error);
    }
};

export default {
    register,
    login,
};
