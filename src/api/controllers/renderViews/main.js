async function main(req, res, next, model) {
    const userId = req.session.passport.user;
    const [user] = await model.user.getUserInfoById(userId);

    res.render('main', {
        title: 'Главная страница',
        data: JSON.stringify({ user })
    });
}

module.exports = {
    main
}