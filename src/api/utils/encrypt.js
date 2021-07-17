const crypto = require('crypto');

const salt = process.env.NODE_ENV === 'production' ? process.env.SALT : 'dev_salt';

async function encrypt(password) {
    return new Promise((resolve, reject) => {
        if (!salt) {
            reject('Соль не установлена!');
        }

        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            resolve(derivedKey.toString('hex'));
        })
    });
}

module.exports = encrypt;