async function user(req, res) {
    res.render('user', {
        title: 'Страница пользователя',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    user
}