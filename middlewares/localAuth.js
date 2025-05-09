import passport from 'passport';

/**
 * Local Passport Auth Handling Middleware
 * - handles error from invalid credentials
 */

const localAuth = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        // handles error from done callback
        if (error) {
            console.error('Error registering user: ', error);
            return res.sendStatus(500);
        }

        if (!user) {
            return res
                .status(info.statusCode || 401)
                .json({ message: info.message || 'Unauthorized' });
        }

        // manually attach user to request object
        req.user = user;
        next();
    })(req, res, next);
};

export default localAuth;
