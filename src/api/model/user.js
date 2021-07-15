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

    function getUsersInfo() {
        return query(`
            SELECT *
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
            SELECT * 
            FROM users u 
            WHERE id=${escape(id)} 
            LEFT JOIN personal_info p
            ON u.id=p.user_id 
        `);
    }

    function getUsersInfoByIds(ids) {
        return query(`
            SELECT *
            FROM users u
            WHERE id IN (${escape(ids.join(','))})
            LEFT JOIN personal_info p
            ON u.id=p.user_id
        `);
    }

    function createUser(user) {
        const { login, hashPassword } = user;
        const values = [
            login,
            hashPassword,
            'NOW()'
        ];

        return query(`
            INSERT INTO users (login, hash_password, created_at)
            VALUES (${escape(values.join(', '))})
            RETURNING *
        `);
    }

    function createPersonalData(personalData) {
        const { userId, age, gender, name, city, interests, second_name } = personalData;
        const values = [
            userId,
            age,
            gender,
            name,
            city,
            interests,
            second_name
        ];

        return query(`
            INSERT INTO personal_info (user_id, age, gender, name, city, interests, second_name)
            VALUES (${escape(values.join(', '))})
        `);
    }

    return {
        getUsersInfo,
        getUserInfoById,
        getUsersInfoByIds,
        createUser,
        createPersonalData,
        findUserByLoginAndHash,
        findUserById
    }
}