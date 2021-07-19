const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

const controllers = require('./src/api/controllers');
const renderViews = require('./src/api/controllers/renderViews');
const { connect } = require('./src/database/connectDB');
const createModel = require('./src/api/model');
const passportConfig = require('./src/api/middlewares/passport');
const { authenticateMiddleware, loginMiddleware } = require('./src/api/middlewares/auth');
const { AUTH_TYPES } = require('./src/api/constants');

const database = connect();
const model = createModel(database);
const createController = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next, model);
    } catch (err) {
        res.status(500);
        res.send('Unexpected error from server: ', JSON.stringify(err));
    }
};

passportConfig(model);

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', authenticateMiddleware(AUTH_TYPES.PAGE_AUTH), createController(renderViews.main));
app.get('/friends', authenticateMiddleware(AUTH_TYPES.PAGE_AUTH), createController(renderViews.friends));
app.get('/users', authenticateMiddleware(AUTH_TYPES.PAGE_AUTH), createController(renderViews.users));
app.get('/user/:id', authenticateMiddleware(AUTH_TYPES.PAGE_AUTH), createController(renderViews.user));
app.get('/registration', renderViews.registration);
app.get('/authorization', renderViews.authorization);
app.get('/friend_requests', authenticateMiddleware(AUTH_TYPES.PAGE_AUTH), createController(renderViews.friendRequests));

app.post('/api/register', createController(controllers.register));
app.post('/api/login', authenticateMiddleware(AUTH_TYPES.INITIAL_AUTH), loginMiddleware);
app.post('/api/logout', authenticateMiddleware(AUTH_TYPES.REQUEST_AUTH), createController(controllers.logout));
app.post('/api/friend-request', authenticateMiddleware(AUTH_TYPES.REQUEST_AUTH), createController(controllers.friendRequest));
app.post('/api/approve-friend-request', authenticateMiddleware(AUTH_TYPES.REQUEST_AUTH), createController(controllers.approveFriendRequest));
app.post('/api/reject-friend-request', authenticateMiddleware(AUTH_TYPES.REQUEST_AUTH), createController(controllers.rejectFriendRequest));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
