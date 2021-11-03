const knex = require('knex')
const connection = require('../knex-config')
const {Model} = require("objection");
const {User} = require("./users.model");

const knexConnect = knex(connection);

// Give the knex instance to objection.
Model.knex(knexConnect);

// Task model.
class Task extends Model {
    static get tableName() {
        return 'tasks';
    }
    static get idColumn() {
        return 'uniqueId';
    }
    static get relationMappings() {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'tasks.ownerId',
                    to: 'users.uniqueId'
                }
            }
        };
    }
}

module.exports = {
    Task
}