const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encrypt = require('../utils/encrypt');

const customFields = {
    usernameField: 'login',
    passwordField: 'password'
}

module.exports = (model) => {
    async function verifyCallback(loginRaw, pwdRaw, done) {
        const password = pwdRaw.trim();
        const login = loginRaw.trim();
        const hash = await encrypt(password);

        const [user] = await model.user.findUserByLoginAndHash(login, hash);

        if (!user) {
            return done(null, false, { status: 'error', message: 'Неверный логин или пароль' });
        }

        return done(null, user);
    }

    const strategy = new LocalStrategy(customFields, verifyCallback);

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (userId, done) => {
        const user = await model.user.findUserById(userId);

        if (user) {
            done(null, user);
        } else {
            done('User not found in deserialize!');
        }
    });
}