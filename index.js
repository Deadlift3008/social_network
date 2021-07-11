const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

const controllers = require('./src/api/controllers');
const renderViews = require('./src/api/controllers/renderViews');

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

app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);
app.post('/api/logout', controllers.logout);
app.post('/api/friend-request', controllers.friendRequest);
app.post('/api/approve-friend-request', controllers.approveFriendRequest);
app.post('/api/reject-friend-request', controllers.rejectFriendRequest);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
