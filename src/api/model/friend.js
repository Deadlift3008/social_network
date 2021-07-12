module.exports = (db, model) => {
    const { query, escape } = db;

    async function getFriendsByUserId(userId) {
        // TODO: можно оптимизировать если использовать JOIN
        const friendsList = await query(`
            SELECT * 
            FROM friends f
            WHERE id=${escape(userId)} 
        `);

        return model.user.getUsersByIds(friendsList);
    }

    function createFriend(userId, friendId) {
        const values = [
            userId,
            JSON.stringify([friendId]),
            'NOW()',
            'NOW()'
        ];

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

    return {
        getFriendsByUserId,
        createFriend,
        updateFriends
    }
}