async function authorization(req, res) {
    res.render('authorization', {
        title: 'Авторизация',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    authorization
}