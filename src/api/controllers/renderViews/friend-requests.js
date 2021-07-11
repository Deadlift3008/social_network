async function friendRequests(req, res) {
    res.render('friend-requests', {
        title: 'Запросы в друзья',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    friendRequests
}