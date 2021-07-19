async function friendRequest(req, res, next, model) {
    const userId = req.session.passport.user;
    const recipientId = req.body.userId;

    const existingRequest = await model.friendRequest.findExistingRequest(userId, recipientId);

    if (existingRequest.length) {
        res.status(500);
        res.json({ status: 'error', message: 'Запрос уже отправлен' });

        return;
    }

    await model.friendRequest.createFriendRequest(userId, recipientId);

    res.status(200);
    res.json({ status: 'ok' });
}

async function approveFriendRequest(req, res, next, model) {
    const userId = req.session.passport.user;
    const senderId = req.body.userId;

    const existingRequest = await model.friendRequest.findExistingRequest(senderId, userId);

    if (!existingRequest.length) {
        res.status(500);
        res.json({ status: 'error', message: 'Такой заявки нет' });

        return;
    }

    // TODO: сделать транзакцией
    await model.friendRequest.deleteFriendRequest(senderId, userId);
    await model.friend.createFriend(senderId, userId);

    res.status(200);
    res.json({ status: 'ok' });
}

async function rejectFriendRequest(req, res, next, model) {
    const userId = req.session.passport.user;
    const senderId = req.body.userId;

    const existingRequest = await model.friendRequest.findExistingRequest(senderId, userId);

    if (!existingRequest.length) {
        res.status(500);
        res.json({ status: 'error', message: 'Такой заявки нет' });

        return;
    }

    await model.friendRequest.deleteFriendRequest(senderId, userId);

    res.status(200);
    res.json({ status: 'ok' });
}

module.exports = {
    friendRequest,
    approveFriendRequest,
    rejectFriendRequest
}