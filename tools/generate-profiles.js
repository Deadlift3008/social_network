const faker = require('faker');
const axios = require('axios');

const count = process.env.COUNT || 10;
const url = process.env.URL || 'http://localhost:3000/api/register';

function getDiffTimeInSec(startTime) {
    return (Date.now() - startTime) / 1000;
}

function getRandomSecondName() {
    const wordsCount = Math.ceil(Math.random() * 4);

    const result = [];

    for (let i = 0; i < wordsCount; i++) {
        result.push(faker.name.lastName());
    }

    return result.join('-');
}

(async function() {
    let done = 0;

    const startTime = Date.now();

    for (let i = 0; i < count; i++) {
        const login = [1, 2, 3, 4, 5].map(_ => faker.lorem.word()).join('_');
        const password = '123';
        const name = faker.name.firstName();
        const second_name = getRandomSecondName();
        const gender = faker.name.gender();
        const city = faker.address.city();
        const age = Math.floor(((Math.random() * 40) + 15));
        const interests = [1, 2, 3].map(_ => faker.hacker.verb() + ' ' + faker.hacker.noun()).join(', ');

        try {
            await axios.post(url, {
                login,
                password,
                name,
                second_name,
                gender,
                city,
                age,
                interests
            });

            done += 1;
        } catch (e) {
            console.log('ERROR:');
            console.log(e.response && e.response.data);
            console.log('continue...');
        }
    }

    console.log(`Done for ${done} profiles in ${getDiffTimeInSec(startTime)} sec`);
})();
