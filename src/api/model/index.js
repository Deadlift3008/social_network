const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.NODE_ENV === 'production' ? 'social_network_prod' : 'social_network_dev'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

function query(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        })
    });
}

function escape(param) {
    return connection.escape(param);
}

function getUsers() {
    return query(`
        SELECT *
        FROM users u
        LEFT JOIN personal_info p 
        ON u.id=p.user_id 
    `);
}

function getUserById(id) {
    return query(`
        SELECT * 
        FROM users u 
        WHERE id=${escape(id)} 
        LEFT JOIN personal_info p
        ON u.id=p.user_id 
    `);
}

function getUsersByIds(ids) {
    return query(`
        SELECT *
        FROM users u
        WHERE id IN (${escape(ids.join(','))})
        LEFT JOIN personal_info p
        ON u.id=p.user_id
    `);
}

async function getFriendsByUserId(userId) {
    // TODO: можно оптимизировать если использовать JOIN
     const friendsList = await query(`
        SELECT * 
        FROM friends f
        WHERE id=${escape(userId)} 
    `);

    return getUsersByIds(friendsList);
}

function getOutgoingRequestsByUserId(userId) {
    return query(`
        SELECT *
        FROM friend_requests f
        WHERE sender=${escape(userId)}
        LEFT JOIN personal_info p
        ON f.sender=p.user_id
    `);
}

function getIncomingRequestsByUserId(userId) {
    return query(`
        SELECT *
        FROM friend_requests f
        WHERE recipient=${escape(userId)}
        LEFT JOIN personal_info p
        ON f.recipient=p.user_id
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

function createFriendRequest(senderId, recipientId) {
    const values = [
        senderId,
        recipientId,
        'NOW()'
    ];

    return query(`
        INSERT INTO friend_requests (sender, recipient, created_at)
        VALUES (${escape(values.join(', '))})
    `);
}

function createFriend(userId, friendId) {
    const values = [
        userId,
        JSON.stringify([friendId]),
        'NOW()',
        'NOW()'
    ]

    return query(`
        INSERT INTO friends (user_id, friends_list, created_at, updated_at)
        VALUES (${escape(values.join(', '))})
    `);
}

function updateFriends(userId, friendsIds) {
    return query(`
        UPDATE friends
        SET friends_list=${escape(JSON.stringify(friendsIds))}, updated_at=NOW()
        WHERE user_id=${userId}
    `);
}

function deleteFriendRequest(senderId, recipientId) {
    return query(`
        DELETE FROM friend_requests
        WHERE sender=${escape(senderId)} 
        AND recipient=${escape(recipientId)}
    `);
}

module.exports = {
    getUsers,
    getUserById,
    getFriendsByUserId,
    getOutgoingRequestsByUserId,
    getIncomingRequestsByUserId,
    createUser,
    createPersonalData,
    createFriendRequest,
    createFriend,
    updateFriends,
    deleteFriendRequest
};
