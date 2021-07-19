async function user(req, res, next, model) {
    const userId = req.params.id;
    const [user] = await model.user.getUserInfoById(userId);

    res.render('user', {
        title: 'Страница пользователя',
        data: JSON.stringify({ user })
    });
}

module.exports = {
    user
}