const mysql = require('mysql');
const dbConfig = require('./DB-config');
const pool = mysql.createPool({
    ...dbConfig,
    connectionLimit : 10,
});

function connect() {
    return {
        query(queryString) {
            return new Promise((resolve, reject) => {
                pool.query(queryString, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(results);
                })
            });
        },
        escape(param) {
            return pool.escape(param);
        }
    }
}

module.exports = {
    connect
}
