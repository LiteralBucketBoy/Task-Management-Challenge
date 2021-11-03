const {v4: uuidv4} = require("uuid");
const {Task} = require("./models/tasks.model");
const knex = require('knex')
const connection = require('./knex-config')
const {User} = require("./models/users.model");

const knexConnect = knex(connection);

async function createSchema() {
    await knexConnect.schema.dropTableIfExists('tasks').
    then( async ()=>
        await knexConnect.schema.dropTableIfExists('users').
        then(async ()=> {
                await knexConnect.schema.createTable('users', table => {
                    table.string('uniqueId').primary();
                    table.integer('index').notNullable();
                    table.datetime('dateAdded').notNullable();
                    table.datetime('dateModified').notNullable();
                    table.boolean('archived').notNullable();
                    table.string('password').notNullable();
                    table.string('userName').notNullable();
                });

                await knexConnect.schema.createTable('tasks', table => {
                    table.string('uniqueId').primary();
                    table.integer('index').notNullable();
                    table.datetime('dateAdded').notNullable();
                    table.datetime('dateModified').notNullable();
                    table.boolean('archived').notNullable();
                    table.boolean('isMarked').notNullable();
                    table.string('taskString').notNullable();
                    table.string('ownerId').references('users.uniqueId');
                });
            }
        )
    )





}

async function initialData() {

    const adminId = "u-"+ uuidv4();
    const adminInsert = await User.query().insert({
        index:0,
        uniqueId:adminId,
        dateAdded: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        archived:false,
        password:"password",
        userName:"Admin",
    });

    console.log(adminInsert);


    const adminTasksInsert = await Task.query().insert({
        index:0,
        uniqueId:"t-" + uuidv4(),
        dateAdded: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        archived:false,
        isMarked:false,
        taskString:"Create new User",
        ownerId: adminId
    });

    console.log(adminTasksInsert);

}

module.exports = {
    createSchema,
    initialData,
}