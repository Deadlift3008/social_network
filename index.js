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
            test: 'Здесь будут данные пользователя'
        })
    });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
