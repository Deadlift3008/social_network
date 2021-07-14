module.exports = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.NODE_ENV === 'production' ? 'social_network_prod' : 'social_network_dev',
    port: process.env.PORT || 3306
};
