'use strict';

const Hapi = require('@hapi/hapi');
const knex = require('knex')
const Catbox = require('catbox');
const CatboxRedis = require('catbox-redis');
const CatboxMemory = require('catbox-memory');

const routes = require('./routes');
const connection = require('./knex-config')
const knexConnect = knex(connection);
const {createSchema, initialData} = require("./dbSetup");
const {User} = require("./models/users.model");

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


const startDB = async function (){
    await createSchema()
        .then(() => initialData())
        .then(() => knexConnect.destroy());


    const validate = async function (decoded, request, h) {

        // do your checks to see if the person is valid
        if (!User.query().findById(request.payload.uniqueId) instanceof User) {
            return { isValid: false };
        }
        else {
            return { isValid: true };
        }
    };
    await server.register(require('../lib'));
    server.auth.strategy('jwt', 'jwt',
        { key: 'NeverShareYourSecret', // Never Share your secret key
            validate  // validate function defined above
        });

    server.auth.default('jwt');
}


// Start the server
async function start() {
    //The start wipes the db just for dev reasons, else it would retain data on start
    await startDB()
            .then( async () =>
            {
                await server.start();
                console.log('Server running at:', server.info.uri)
            }
            ).catch(err => {
                    console.error(err);
                    process.exit(1);
            }
        )


}

start();