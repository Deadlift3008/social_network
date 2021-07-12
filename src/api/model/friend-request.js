module.exports = (db) => {
    const { query, escape } = db;

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