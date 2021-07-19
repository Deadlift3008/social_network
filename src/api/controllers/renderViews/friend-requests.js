async function friendRequests(req, res, next, model) {
    const userId = req.session.passport.user;
    const outgoingRequests = await model.friendRequest.getOutgoingRequestsByUserId(userId);
    const incomingRequests = await model.friendRequest.getIncomingRequestsByUserId(userId);

    res.render('friend-requests', {
        title: 'Запросы в друзья',
        data: JSON.stringify({
            outgoingRequests,
            incomingRequests
        })
    });
}

module.exports = {
    friendRequests
}