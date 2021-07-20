module.exports = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.NODE_ENV === 'production' ? process.env.DATABASE : 'social_network_dev',
    port: process.env.DB_PORT || 3306
};
