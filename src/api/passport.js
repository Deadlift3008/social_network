const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const salt = process.env.NODE_ENV === 'production' ? process.env.SALT : 'dev_salt';

async function encrypt(password) {
    return new Promise((resolve, reject) => {
        if (!salt) {
            reject('Соль не установлена!');
        }

        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey.toString('hex'));
        })
    });
}

const customFields = {
    usernameField: 'login',
    passwordField: 'password'
}

module.exports = (model) => {
    async function verifyCallback(loginRaw, pwdRaw, done) {
        const password = pwdRaw.trim();
        const login = loginRaw.trim();
        const hash = await encrypt(password);

        const user = await model.user.findUserByLoginAndHash(login, hash);

        if (!user) {
            return done(null, false, { message: 'Неверный логин или пароль' });
        }

        return done(null, user);
    }

    const strategy = new LocalStrategy(verifyCallback);

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