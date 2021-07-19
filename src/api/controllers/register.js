const encrypt = require('../utils/encrypt');

const validationConfig = {
    login: (value) => {
        return (!value || value.length > 20) && 'Логин обязателен и не более 20 символов';
    },
    password: (value) => {
        return (!value || value.length > 15 || value.length < 5) && 'Пароль обязателен и должен быть от 5 до 15 символов'
    },
    age: (value) => {
        if (!value) {
            return;
        }

        if (isNaN(parseInt(value, 10))) {
            return 'Возраст должен быть числом!';
        }
    },
    gender: (value) => {
        return value && value.length > 20 && 'Пол должен быть менее 20 символов';
    },
    name: (value) => {
        return value && (value.length > 15 || value.length < 3) && 'Имя должно быть от 2ух до 15 символов';
    },
    city: (value) => {
        return value && (value.length < 3 || value.length > 20) && 'Город должен быть от 3 до 20 символов';
    },
    interests: (value) => {
        return value && value.length > 140 && 'Интересы должны быть менее 140 символов';
    },
};

function validate(fields) {
    let errorMessage;

    Object.keys(validationConfig).forEach(fieldName => {
        errorMessage = validationConfig[fieldName](fields[fieldName]);
    });

    return errorMessage;
}

async function register(req, res, next, model) {
    const validationError = validate(req.body);

    if (validationError) {
        res.status(500);
        res.json({ status: 'error', message: validationError });
        return;
    }

    let { login, password, age, gender, name, city, interests, second_name } = req.body;

    if (age) {
        age = parseInt(age, 10);
    }

    try {
        const existingUser = await model.user.findUserByLogin(login);

        if (existingUser.length) {
            res.status(500);
            res.json({ status: 'Пользователь с таким логином уже существует' });

            return;
        }

        const hashPassword = await encrypt(password);

        const created = await model.user.createUser({
            login,
            hashPassword
        });

        const userId = created.insertId;

        await model.user.createPersonalData({
            userId,
            age,
            gender,
            name,
            city,
            interests,
            second_name
        });

        res.status(200);
        res.json({ status: 'ok' });
    } catch (err) {
        res.status(500).send({ error: JSON.stringify(err) });
    }
}

module.exports = {
    register
}