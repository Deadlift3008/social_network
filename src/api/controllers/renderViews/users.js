async function users(req, res, next, model) {
    const usersInfos = await model.user.getUsersInfo();
    const userId = req.session.passport.user;
    const friends = await model.friend.getFriendsIdsByUserId(userId);
    const outgoingRequests = await model.friendRequest.getOutgoingRequestsByUserId(userId);

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

    res.render('users', {
        title: 'Пользователи',
        data: JSON.stringify({ users })
    });
}

module.exports = {
    users
}