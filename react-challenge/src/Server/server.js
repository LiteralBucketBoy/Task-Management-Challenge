'use strict';

const Hapi = require('@hapi/hapi');

const Catbox = require('catbox');
const CatboxRedis = require('catbox-redis');
const CatboxMemory = require('catbox-memory');

const routes = require('./routes');

const knex = require('knex')
const connection = require('./knex-config')
const knexConnect = knex(connection);
const {createSchema, initialData} = require("./dbSetup");


const server = Hapi.server({
    host: 'localhost',
    port: 8000,
    cache : [
        {
            name: 'my_cache',
            provider: {
                constructor: CatboxRedis,
                options: {
                    partition : 'my_cached_data',
                    host: '127.0.0.1',
                    port: 6379
                }
            }
        }
    ]

});

server.route(routes);
/*
server.method('sum', add, {
    cache: {
        cache: 'my_cache',
        expiresIn: 10 * 1000,
        generateTimeout: 2000,
        getDecoratedValue: true
    }
});
*/


// Start the server
async function start() {
    //The start wipes the db just for dev reasons, else it would retain data
    await createSchema()
            .then(() => initialData())
            .then(() => knexConnect.destroy())
            .then( async () =>
            {
                await server.start();
                console.log('Server running at:', server.info.uri)
            }
            ).catch(err => {
                    console.error(err);
                    knexConnect.destroy();
                    process.exit(1);
            }
        )


}

start();