const mysql = require('mysql');
const dbConfig = require('./DB-config');
const connection = mysql.createConnection(dbConfig);

function connect() {
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    return {
        query(queryString) {
            return new Promise((resolve, reject) => {
                connection.query(queryString, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(results);
                })
            });
        },
        escape(param) {
            return connection.escape(param);
        }
    }
}

module.exports = {
    connect
}
