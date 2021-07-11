const { register } = require('./register');
const { login, logout } = require('./authorize');
const { friendRequest, approveFriendRequest, rejectFriendRequest } = require('./friend-request');

module.exports = {
    register,
    login,
    logout,
    friendRequest,
    approveFriendRequest,
    rejectFriendRequest
}
