import mongoose from 'mongoose';

/**
 * Game Model Definition
 * - title must be unique to prevent duplicate games
 */

const Schema = mongoose.Schema;

const GameSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
    },
    platform: {
        type: String,
    },
    releaseYear: {
        type: Number,
    },
    description: {
        type: String,
    },
});

export default mongoose.model('Game', GameSchema);
