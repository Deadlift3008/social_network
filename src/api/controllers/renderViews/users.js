async function users(req, res) {
    res.render('users', {
        title: 'Пользователи',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    users
}