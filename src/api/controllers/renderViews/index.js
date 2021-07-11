const { authorization } = require('./authorization');
const { friends } = require('./friends');
const { main } = require('./main');
const { registration } = require('./registration');
const { user } = require('./user');
const { users } = require('./users');
const { friendRequests } = require('./friend-requests');

module.exports = {
    authorization,
    friends,
    main,
    registration,
    user,
    users,
    friendRequests
}
