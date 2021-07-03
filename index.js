const express = require('express')
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('main', {
        title: 'Главная страница',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.get('/friends', (req, res) => {
    res.render('friends', {
        title: 'Друзья',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.get('/users', (req, res) => {
    res.render('users', {
        title: 'Пользователи',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.get('/user', (req, res) => {
    res.render('user', {
        title: 'Страница пользователя',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Регистрация',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.get('/authorization', (req, res) => {
    res.render('authorization', {
        title: 'Авторизация',
        data: JSON.stringify({
            test: 'Здесь будут данные'
        })
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
