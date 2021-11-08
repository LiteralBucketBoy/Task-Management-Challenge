
const Joi = require("@hapi/joi");
const userHandler = require('../handlers/users.handler');
//const userSchema = require('../schemas/users.schema');


module.exports = [
    {
        method: 'POST',
        path:'/login',
        handler: userHandler.login,
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                    logData: {
                        name: Joi.string(),
                        password: Joi.string()
                    },

                })
            }
        }
    },
    {
        method: 'POST',
        path:'/logout',
        handler: userHandler.logout,
    },
    {
        method: 'GET',
        path:'/users/{userName}',
        handler: userHandler.getUsers,

    },
    {
        method: 'PUT',
        path: '/users',
        handler: userHandler.addUser,


    },
    {
        method: 'PUT',
        path: '/users/signUp',
        config: { auth: false },
        handler: userHandler.addUser,


    },
    {
        method: 'PATCH',
        path: '/user/{userName}',
        handler: userHandler.editUser,

    },

]