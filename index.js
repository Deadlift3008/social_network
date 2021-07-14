const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

const controllers = require('./src/api/controllers');
const renderViews = require('./src/api/controllers/renderViews');
const { connect } = require('./src/database/connectDB');
const createModel = require('./src/api/model');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dbConfig = require('./src/database/DB-config');

const database = connect();
const model = createModel(database);
const createController = (controller) => (req, res) => controller(req, res, model);

const sessionStore = new MySQLStore(dbConfig);

const sess = {
    secret: process.env.SECRET || 'develop_secret',
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

app.use(session(sess));

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
app.post('/api/login', createController(controllers.login));
app.post('/api/logout', createController(controllers.logout));
app.post('/api/friend-request', createController(controllers.friendRequest));
app.post('/api/approve-friend-request', createController(controllers.approveFriendRequest));
app.post('/api/reject-friend-request', createController(controllers.rejectFriendRequest));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
