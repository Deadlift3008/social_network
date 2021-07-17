module.exports = (db) => {
    const { query, escape } = db;

    function findUserByLoginAndHash(login, hash) {
        return query(`
            SELECT *
            FROM users
            WHERE login=${escape(login)}
            AND hash_password=${escape(hash)}
        `);
    }

    function findUserByLogin(login) {
        return query(`
            SELECT *
            FROM users
            WHERE login=${escape(login)}
        `);
    }

    function getUsersInfo() {
        return query(`
            SELECT p.user_id, p.age, p.gender, p.name, p.city, p.interests, p.second_name
            FROM users u
            LEFT JOIN personal_info p 
            ON u.id=p.user_id 
        `);
    }

    function findUserById(id) {
        return query(`
            SELECT *
            FROM users
            WHERE id=${escape(id)}
        `);
    }

    function getUserInfoById(id) {
        return query(`
            SELECT p.user_id, p.age, p.gender, p.name, p.city, p.interests, p.second_name 
            FROM users u  
            LEFT JOIN personal_info p
            ON u.id=p.user_id 
            WHERE id=${escape(id)}
        `);
    }

    function getUsersInfoByIds(ids) {
        const escapedIds = ids.map(id => escape(id))

        return query(`
            SELECT p.user_id, p.age, p.gender, p.name, p.city, p.interests, p.second_name
            FROM users u
            LEFT JOIN personal_info p
            ON u.id=p.user_id
            WHERE u.id IN (${escapedIds.join(',')})
        `);
    }

    function createUser(user) {
        const { login, hashPassword } = user;
        const values = [
            escape(login),
            escape(hashPassword),
            'NOW()'
        ];

        return query(`
            INSERT INTO users (login, hash_password, created_at)
            VALUES (${values.join(', ')})
        `);
    }

    function createPersonalData(personalData) {
        const { userId, age, gender, name, city, interests, second_name } = personalData;
        const values = [
            userId,
            escape(age),
            escape(gender),
            escape(name),
            escape(city),
            escape(interests),
            escape(second_name)
        ];

        return query(`
            INSERT INTO personal_info (user_id, age, gender, name, city, interests, second_name)
            VALUES (${values.join(', ')})
        `);
    }

    return {
        getUsersInfo,
        getUserInfoById,
        getUsersInfoByIds,
        createUser,
        createPersonalData,
        findUserByLoginAndHash,
        findUserById,
        findUserByLogin
    }
}