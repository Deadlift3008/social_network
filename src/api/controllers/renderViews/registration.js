async function registration(req, res) {
    res.render('registration', {
        title: 'Регистрация',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    registration
}