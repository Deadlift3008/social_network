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
  db.createTable('personal_info', {
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'personal_info_users_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    age: 'smallint',
    gender: 'string',
    name: 'string',
    city: 'string',
    interests: 'text',
    second_name: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('personal_info', callback)
};

exports._meta = {
  "version": 1
};
