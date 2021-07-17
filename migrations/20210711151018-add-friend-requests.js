'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('friend_requests', {
    sender: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'friend_requests_users_sender_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    recipient: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'friend_requests_users_recipient_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    created_at: {
      type: 'date',
      notNull: true
    },
  }, callback);
};

exports.down = function(db, callback) {
  db.removeForeignKey('friend_requests', 'friend_requests_users_sender_id_fk', () => {
    db.removeForeignKey('friend_requests', 'friend_requests_users_recipient_id_fk', () => {
      db.dropTable('friend_requests', callback);
    })
  });
};

exports._meta = {
  "version": 1
};
