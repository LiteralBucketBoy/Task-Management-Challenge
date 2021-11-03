
const knex = require('knex')
const connection = require('../knex-config')
const {Model} = require("objection");
const {Task} = require("./tasks.model");

const knexConnect = knex(connection);

// Give the knex instance to objection.
Model.knex(knexConnect);

// Person model.
class User extends Model {
    static get tableName() {
        return 'users';
    }
    static get idColumn() {
        return 'uniqueId';
    }
    static get relationMappings() {
        return {
            tasks: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'users.uniqueId',
                    to: 'tasks.ownerId'
                }
            }
        };
    }
}


module.exports = {
    User,
}