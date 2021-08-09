const { USER_LIST_LIMIT } = require('../constants');

module.exports = (db) => {
    const { query, escape } = db;

    function getLikeExpressionFromSearchParams(searchParams, prefix) {
        let likeExpression = '';
        const searchKeys = Object.keys(searchParams).filter(key => Boolean(searchParams[key]));

        if (searchKeys.length) {
            likeExpression = 'WHERE ' + searchKeys
                .map(key => `${prefix || ''}${key} LIKE ${escape(searchParams[key] + '%')}`)
                .join('\nAND ');
        }

        return likeExpression;
    }

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

    function findUserByNameAndSecondName(name, second_name) {
        return query(`
            SELECT user_id
            FROM personal_info
            WHERE name=${escape(name)}
            AND second_name=${escape(second_name)}
        `);
    }

    function getUsersCount(searchParams) {
        return query(`
            SELECT COUNT(*) as count 
            FROM personal_info p
            ${getLikeExpressionFromSearchParams(searchParams, 'p.')}
        `);
    }

    function getUsersInfo(offset, searchParams) {
        return query(`
            SELECT p.user_id, p.age, p.gender, p.name, p.city, p.interests, p.second_name 
            FROM personal_info p
            ${getLikeExpressionFromSearchParams(searchParams, 'p.')}
            GROUP BY p.user_id
            LIMIT ${USER_LIST_LIMIT}
            OFFSET ${escape(offset)} 
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
            SELECT user_id, age, gender, name, city, interests, second_name 
            FROM personal_info   
            WHERE user_id=${escape(id)}
        `);
    }

    function getUsersInfoByIds(ids) {
        const escapedIds = ids.map(id => escape(id))

        return query(`
            SELECT user_id, age, gender, name, city, interests, second_name
            FROM personal_info
            WHERE user_id IN (${escapedIds.join(',')})
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

    function deleteUserIfExists(login) {
        return query(`
            DELETE FROM users
            WHERE login=${escape(login)}
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
        findUserByLogin,
        getUsersCount,
        deleteUserIfExists,
        findUserByNameAndSecondName
    }
}