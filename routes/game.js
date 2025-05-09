import express from 'express';
import GameController from '../controllers/GameController.js';
import { checkSchema } from 'express-validator';
import {
    addGameValidationSchema,
    deleteGameValidationSchema,
    getAllGamesValidationSchema,
    updateGameValidationSchema,
} from '../utils/validationSchema.js';
import checkValidation from '../middlewares/checkValidation.js';

const router = express.Router();

// Add Game
router.post(
    '/',
    checkSchema(addGameValidationSchema),
    checkValidation,
    GameController.addGame
);

// Update Game
router.patch(
    '/:id',
    checkSchema(updateGameValidationSchema),
    checkValidation,
    GameController.updateGame
);

// Delete Game
router.delete(
    '/:id',
    checkSchema(deleteGameValidationSchema),
    checkValidation,
    GameController.deleteGame
);

// Get All Games
router.get(
    '/',
    checkSchema(getAllGamesValidationSchema),
    checkValidation,
    GameController.getAllGames
);

export default router;
