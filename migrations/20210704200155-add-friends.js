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
  db.createTable('friends', {
    id: {
      type: 'int',
      notNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'friends_users_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    friend_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'friends_users_friend_id_fk',
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
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.removeForeignKey('friends', 'friends_users_user_id_fk', () => {
    db.removeForeignKey('friends', 'friends_users_friend_id_fk', () => {
      db.dropTable('friends', callback);
    })
  });
};

exports._meta = {
  "version": 1
};
