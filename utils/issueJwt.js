import jwt from 'jsonwebtoken';

/**
 * JSON Web Token Generation
 * - handles generation of token using RS256
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

const issueJwt = (user) => {
    const id = user._id;
    const expiresIn = '5h';

    const payload = {
        id,
    };

    const options = {
        expiresIn,
        algorithm: 'RS256',
    };

    const token = jwt.sign(payload, PRIVATE_KEY, options);

    return {
        token,
        expiresIn,
    };
};

export default issueJwt;
