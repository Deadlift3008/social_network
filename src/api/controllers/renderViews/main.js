async function main(req, res) {
    res.render('main', {
        title: 'Главная страница',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
}

module.exports = {
    main
}