
const Joi = require("joi");
const userHandler = require('../handlers/users.handler');
const userSchema = require('../schemas/users.schema');


module.exports = [
    {
        method: 'POST',
        path:'/login',
        config: { auth: false },
        handler: userHandler.login,
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
        method: 'PATCH',
        path: '/user/{userName}',
        handler: userHandler.editUser,

    },

]