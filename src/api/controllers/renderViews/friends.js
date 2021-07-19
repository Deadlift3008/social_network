async function friends(req, res, next, model) {
    const userId = req.session.passport.user;
    const friends = await model.friend.getFriendsInfoByUserId(userId);

    res.render('friends', {
        title: 'Друзья',
        data: JSON.stringify({
            friends
        })
    });
}

module.exports = {
    friends
}