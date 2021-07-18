const { register } = require('./register');
const { successLogin, logout } = require('./authorize');
const { friendRequest, approveFriendRequest, rejectFriendRequest } = require('./friend-request');

module.exports = {
    register,
    successLogin,
    logout,
    friendRequest,
    approveFriendRequest,
    rejectFriendRequest
}
