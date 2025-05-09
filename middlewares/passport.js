import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import { checkPassword } from '../utils/hashPassword.js';

/**
 * Local Strategy
 * - authenticates user using email and password
 */

const localOptions = { usernameField: 'email' };

const localStrategy = new LocalStrategy(
    localOptions,
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, {
                    statusCode: 404,
                    message: 'Email is not registered',
                });
            }

            const matchedPassword = await checkPassword(
                password,
                user.password
            );

            if (!matchedPassword) {
                return done(null, false, {
                    statusCode: 401,
                    message: 'Invalid credentials.',
                });
            }

            return done(null, user);
        } catch (error) {
            console.error({ error });
            return done(error);
        }
    }
);

/**
 * JWT Strategy
 * - authenticates game APIs using JSON web token
 */

const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
    algorithms: ['RS256'],
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findOne({ _id: payload.id });

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        console.error('Error logging in user: ', error);
        return done(error, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);
