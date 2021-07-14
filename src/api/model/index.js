const createUserModel = require('./user');
const createFriendModel = require('./friend');
const createFriendRequestModel = require('./friend-request');

module.exports = (db) => {
    return {
        user: createUserModel(db),
        friendRequest: createFriendRequestModel(db),
        friend: createFriendModel(db),
        query: db.query
    };
};
