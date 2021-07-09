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
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'friends_users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    users_list: 'JSON'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('friends', callback)
};

exports._meta = {
  "version": 1
};
