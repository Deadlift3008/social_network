async function friends(req, res) {
    res.render('friends', {
        title: 'Друзья',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    friends
}