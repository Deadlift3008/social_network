const { register } = require('./register');
const { login, logout } = require('./authorize');
const { friendRequest } = require('./friend-request');

module.exports = {
    register,
    login,
    logout,
    friendRequest
}
