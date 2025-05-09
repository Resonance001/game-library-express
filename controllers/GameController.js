import Game from '../models/Game.js';

// Handle create game
const addGame = async (req, res, next) => {
    try {
        const game = new Game(req.body);

        await game.save();
        res.status(201).json({ message: 'Successfully added game.' });
    } catch (error) {
        console.error('Error creating game: ', error);
        next(error);
    }
};

// Handle update game details by game ID
const updateGame = async (req, res, next) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Successfully updated game details.' });
    } catch (error) {
        console.error('Error updating game: ', error);
        next(error);
    }
};

// Handle game deletion by game ID
const deleteGame = async (req, res, next) => {
    try {
        const deletedGame = await Game.findByIdAndDelete(req.params.id);

        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json({ message: 'Successfully deleted game.' });
    } catch (error) {
        console.error('Error deleting game: ', error);
        next(error);
    }
};

// Handle get all games with search function through query parameters
const getAllGames = async (req, res, next) => {
    try {
        const filter = {};

        for (const key in req.query) {
            const val = req.query[key];

            if (key === 'releaseYear') {
                filter[key] = Number(val);
            } else {
                filter[key] = { $regex: val, $options: 'i' };
            }
        }

        const allGames = await Game.find(filter);
        res.status(200).json(allGames);
    } catch (error) {
        console.error('Error fetching games: ', error);
        next(error);
    }
};

export default {
    addGame,
    updateGame,
    deleteGame,
    getAllGames,
};
