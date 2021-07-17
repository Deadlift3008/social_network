module.exports = (db) => {
    const { query, escape } = db;

    function getOutgoingRequestsByUserId(userId) {
        return query(`
            SELECT *
            FROM friend_requests f
            LEFT JOIN personal_info p
            ON f.recipient=p.user_id
            WHERE sender=${escape(userId)}
        `);
    }

    function getIncomingRequestsByUserId(userId) {
        return query(`
            SELECT *
            FROM friend_requests f
            LEFT JOIN personal_info p
            ON f.sender=p.user_id
            WHERE recipient=${escape(userId)}
        `);
    }

    function createFriendRequest(senderId, recipientId) {
        const values = [
            escape(senderId),
            escape(recipientId),
            'NOW()'
        ];

        return query(`
            INSERT INTO friend_requests (sender, recipient, created_at)
            VALUES (${values.join(', ')})
        `);
    }

    function deleteFriendRequest(senderId, recipientId) {
        return query(`
            DELETE FROM friend_requests
            WHERE sender=${escape(senderId)} 
            AND recipient=${escape(recipientId)}
        `);
    }

    return {
        getOutgoingRequestsByUserId,
        getIncomingRequestsByUserId,
        createFriendRequest,
        deleteFriendRequest
    }
}