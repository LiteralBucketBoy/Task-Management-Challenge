
const Joi = require("joi");
const userHandler = require('../handlers/users.handler');
const userSchema = require('../schemas/users.schema');


module.exports = [
    {
        method: 'POST',
        path:'/login',
        config: { auth: false },
        handler: userHandler.login,
        options: {
            response: {
                schema: Joi.object({testList: Joi.array().items(taskModel.taskSchema)})

            }
        }
    },
    {
        method: 'POST',
        path:'/logout',
        config: { auth: 'jwt' },
        handler: userHandler.logout,
        options: {
            response: {
                schema: Joi.object({testList: Joi.array().items(taskModel.taskSchema)})

            }
        }
    },
    {
        method: 'GET',
        path:'/users',
        config: { auth: 'jwt' },
        handler: userHandler.getUsers,
        options: {
            response: {
                schema: Joi.object({testList: Joi.array().items(taskModel.taskSchema)})

            }
        }
    },
    {
        method: 'PUT',
        path: '/users',
        config: { auth: false },
        handler: userHandler.addUser,
        options: {
            response: {
                schema: userSchema.newUserSchema

            }
        }

    },
    {
        method: 'PATCH',
        path: '/user/{id}',
        config: { auth: 'jwt' },
        handler: userHandler.editUser,

    },

]