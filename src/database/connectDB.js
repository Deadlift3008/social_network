const mysql = require('mysql');
const dbConfig = require('./DB-config');
const connection = mysql.createConnection(dbConfig);

function connect() {
    function tryConnect() {
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            console.log('connected as id ' + connection.threadId);
        });
    }

    tryConnect();

    connection.on('error', function(err) {
        console.log('CONNECTION_ERROR:' + JSON.stringify(err));
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            tryConnect();
        }
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
