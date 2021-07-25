const encrypt = require('../utils/encrypt');

const validationConfig = {
    login: (value) => {
        if (!value) {
            return 'Логин обязателен';
        }

        return (value.length > 100) && 'Логин должен быть не более 100 символов';
    },
    password: (value) => {
        if (!value) {
            return 'Пароль обязателен';
        }

        return (value.length > 15 || value.length < 3) && 'Пароль должен быть от 3 до 15 символов'
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
        return value && value.length > 30 && 'Пол должен быть менее 30 символов';
    },
    name: (value) => {
        if (!value) {
            return 'Имя обязательно';
        }

        return (value.length > 30 || value.length < 3) && 'Имя должно быть от 2ух до 30 символов';
    },
    second_name: (value) => {
        if (!value) {
            return 'Фамилия обязательна';
        }

        return (value.length > 30 || value.length < 3) && 'Фамилия должна быть от 3 до 30 символов';
    },
    city: (value) => {
        return value && (value.length < 3 || value.length > 30) && 'Город должен быть от 3 до 30 символов';
    },
    interests: (value) => {
        return value && value.length > 240 && 'Интересы должны быть менее 240 символов';
    },
};

function validate(fields) {
    const validatorsName = Object.keys(validationConfig);

    for (let i = 0; i < validatorsName.length; i++) {
        const fieldName = validatorsName[i];
        const currentError = validationConfig[fieldName](fields[fieldName]);

        if (currentError) {
            return currentError;
        }
    }
}

async function register(req, res, next, model) {
    const validationError = validate(req.body);

    if (validationError) {
        res.status(200);
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
            res.status(200);
            res.json({ status: 'error', message: 'Пользователь с таким логином уже существует' });

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