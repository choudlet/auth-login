const knex = require('./knex.js');

const db = {}

db.returnAll = function() {
    return knex('profile');
}

db.checkEmail = function(email) {
    return knex('profile').where('email', email)
}

db.storeUser = function(user) {
    return knex('profile').insert(user).returning('*')
  }
module.exports = db;
