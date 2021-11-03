
module.exports = {
    client: 'pg',
    connection:  {
        host : '127.0.0.1',
        port : 5432,
        user : 'db_user',
        password : 'password',
        database : 'postgres'
    },
    searchPath: ['knex', 'public'],
}