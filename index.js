const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

const controllers = require('./src/api/controllers');
const renderViews = require('./src/api/controllers/renderViews');
const { connect } = require('./src/database/connectDB');
const createModel = require('./src/api/model');

const database = connect();
const model = createModel(database);
const createController = (controller) => (req, res) => controller(req, res, model);

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
