import express from 'express';
import AuthController from '../controllers/AuthController.js';
import localAuth from '../middlewares/localAuth.js';
import { checkSchema } from 'express-validator';
import {
    loginUserValidationSchema,
    registerUserValidationSchema,
} from '../utils/validationSchema.js';
import checkValidation from '../middlewares/checkValidation.js';

const router = express.Router();

// User Registration
router.post(
    '/register',
    checkSchema(registerUserValidationSchema),
    checkValidation,
    AuthController.register
);

// User Login
router.post(
    '/login',
    checkSchema(loginUserValidationSchema),
    checkValidation,
    localAuth,
    AuthController.login
);

export default router;
