const faker = require('faker');
const axios = require('axios');

const count = process.env.COUNT || 10;
const url = process.env.URL || 'http://localhost:3000/api/register';

function getDiffTimeInSec(startTime) {
    return (Date.now() - startTime) / 1000;
}

(async function() {
    let done = 0;

    const startTime = Date.now();

    try {
        for (let i = 0; i < count; i++) {
            const login = [1, 2, 3, 4].map(_ => faker.lorem.word()).join('_');
            const password = '123';
            const name = faker.name.firstName();
            const second_name = faker.name.lastName();
            const gender = faker.name.gender();
            const city = faker.address.city();
            const age = Math.floor(((Math.random() * 40) + 15));
            const interests = [1, 2, 3].map(_ => faker.hacker.verb() + ' ' + faker.hacker.noun()).join(', ');

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
        }

        console.log(`Done for ${done} profiles in ${getDiffTimeInSec(startTime)} sec`);
    } catch (e) {
        console.log('ERROR');
        console.log(e);
        console.log(`Done for ${done} profiles in ${getDiffTimeInSec(startTime)} sec`);
    }
})();
