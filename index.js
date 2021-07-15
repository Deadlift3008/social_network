const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

const controllers = require('./src/api/controllers');
const renderViews = require('./src/api/controllers/renderViews');
const { connect } = require('./src/database/connectDB');
const passport = require('passport');
const createModel = require('./src/api/model');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dbConfig = require('./src/database/DB-config');
const passportConfig = require('./src/api/passport');

const database = connect();
const model = createModel(database);
const createController = (controller) => (req, res, next) => controller(req, res, next, model);

passportConfig(model);

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
    saveUninitialized: true,
    resave: false
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', renderViews.main);
app.get('/friends', renderViews.friends);
app.get('/users', renderViews.users);
app.get('/user', renderViews.user);
app.get('/registration', renderViews.registration);
app.get('/authorization', renderViews.authorization);
app.get('/friend_requests', renderViews.friendRequests);

app.post('/api/register', createController(controllers.register));
app.post('/api/login', passport.authenticate('local'), createController(controllers.login));
app.post('/api/logout', createController(controllers.logout));
app.post('/api/friend-request', createController(controllers.friendRequest));
app.post('/api/approve-friend-request', createController(controllers.approveFriendRequest));
app.post('/api/reject-friend-request', createController(controllers.rejectFriendRequest));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
