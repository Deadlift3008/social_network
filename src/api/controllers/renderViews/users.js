const { USER_LIST_LIMIT } = require('../../constants');

async function users(req, res, next, model) {
    let offset = parseInt(req.query.offset || 0, 10);

    if (isNaN(offset)) {
        offset = 0;
    }

    const usersInfos = await model.user.getUsersInfo(offset);
    const userId = req.session.passport.user;
    const friends = await model.friend.getFriendsIdsByUserId(userId);
    const outgoingRequests = await model.friendRequest.getOutgoingRequestsByUserId(userId);
    const [countResponse] = await model.user.getUsersCount();
    const usersCount = countResponse.count;

    const friendsHashMap = friends.reduce((acc, friend) => {
        acc[friend.friend_id] = true;

        return acc;
    }, {});

    const outgoingRequestsMap = outgoingRequests.reduce((acc, request) => {
        acc[request.recipient] = true;

        return acc;
    }, {});

    const users = usersInfos.map(userInfo => ({
        ...userInfo,
        isFriend: Boolean(friendsHashMap[userInfo.user_id]),
        alreadyRequested: Boolean(outgoingRequestsMap[userInfo.user_id])
    })).filter(({ user_id }) => userId !== user_id);

    const nextOffsetToShow = offset + USER_LIST_LIMIT < usersCount ? offset + USER_LIST_LIMIT : undefined;

    let prevOffsetToShow;

    if (offset - USER_LIST_LIMIT > -1) {
        prevOffsetToShow = offset - USER_LIST_LIMIT;
    } else {
        prevOffsetToShow = offset === 0 ? undefined : 0;
    }

    const pageNumber = Math.ceil(offset / USER_LIST_LIMIT) + 1;

    res.render('users', {
        title: 'Пользователи',
        data: JSON.stringify({
            users,
            nextOffsetToShow,
            prevOffsetToShow,
            pageNumber
        })
    });
}

module.exports = {
    users
}