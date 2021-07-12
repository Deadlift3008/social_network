const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.NODE_ENV === 'production' ? 'social_network_prod' : 'social_network_dev'
});

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
