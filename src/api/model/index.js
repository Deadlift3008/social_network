const createUserModel = require('./user');
const createFriendModel = require('./friend');
const createFriendRequestModel = require('./friend-request');

module.exports = (db) => {
    const model = {
        user: createUserModel(db),
        friendRequest: createFriendRequestModel(db),
        query: db.query
    };

    model.friend = createFriendModel(db, model);

    return model;
};
