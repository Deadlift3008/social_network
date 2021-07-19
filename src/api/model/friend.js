module.exports = (db) => {
    const { query, escape } = db;

    function getFriendsInfoByUserId(userId) {
        return query(`
            SELECT p.user_id, p.age, p.gender, p.name, p.city, p.interests, p.second_name 
            FROM friends f
            LEFT JOIN personal_info p
            ON f.friend_id=p.user_id
            WHERE f.user_id=${escape(userId)}
        `);
    }

    function getFriendsIdsByUserId(userId) {
        return query(`
            SELECT id 
            FROM friends f
            WHERE f.user_id=${escape(userId)}
        `);
    }

    function createFriend(userId, friendId) {
        const firstRow = [
            escape(userId),
            escape(friendId),
            'NOW()'
        ];

        const secondRow = [
            escape(friendId),
            escape(userId),
            'NOW()'
        ];

        return query(`
            INSERT INTO friends (user_id, friend_id, created_at)
            VALUES (${firstRow.join(', ')}),
                   (${secondRow.join(', ')})
        `);
    }

    return {
        getFriendsInfoByUserId,
        createFriend,
        getFriendsIdsByUserId
    }
}