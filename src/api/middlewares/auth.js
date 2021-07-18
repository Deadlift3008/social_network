const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dbConfig = require('../../database/DB-config');
const { AUTH_TYPES } = require('../constants');

const sessionStore = new MySQLStore(dbConfig);

const secret = process.env.NODE_ENV === 'production' ? process.env.SECRET : 'develop_secret';

if (!secret) {
    throw new Error('Секрет не установлен!');
}

const sess = {
    secret,
    cookie: {
        maxAge: 1000 * 60  * 60 * 24 // 1 день
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}

if (process.env.NODE_ENV === 'production') {
    sess.cookie.secure = true // serve secure cookies
}

const authResponse = (res) => ({
    [AUTH_TYPES.PAGE_AUTH]: () => res.redirect('/authorization'),
    [AUTH_TYPES.REQUEST_AUTH]: () => res.json({ message: 'Нужна авторизация' })
});

const requireAuth = (authType) => (req, res, next) => {
    const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

    if (isAuthenticated) {
        next();

        return;
    }

    res.status(403);
    authResponse(res)[authType]();
}

function authenticateMiddleware(authType) {
    const middlewares = [
        session(sess),
        passport.initialize(),
        passport.session()
    ]

    if (authType === AUTH_TYPES.PAGE_AUTH || authType === AUTH_TYPES.REQUEST_AUTH) {
        middlewares.push(requireAuth(authType));
    }

    return middlewares;
}

function loginMiddleware(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (!user) {
            res.status(200);
            res.json(info);

            return;
        }

        if (err) {
            res.status(500);
            res.send(err);

            return;
        }

        req.logIn(user, function(err) {
            if (err) {
                res.status(500);
                res.send(err);

                return;
            }

            res.status(200);
            res.json({ status: 'ok' });
        });
    })(req, res, next)
}

module.exports = {
    authenticateMiddleware,
    loginMiddleware
}