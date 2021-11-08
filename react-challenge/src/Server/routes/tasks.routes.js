
const Joi = require("@hapi/joi");
const taskHandler = require('../handlers/tasks.handler');
//const taskModel = require('../schemas/tasks.schema')


module.exports = [
    {
        method: 'GET',
        path:'/todos/{userName}/{filter?}',
        handler: taskHandler.getTasks,
        options: {
            validate: {
                params: Joi.object({
                    userName: Joi.string()
                }),
                query: Joi.object({
                    filter: Joi.string()
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/todos/{userName}',
        handler: taskHandler.addTask,
        options: {
            validate: {
                params: Joi.object({
                    userName: Joi.string()
                }),
                payload: Joi.object({
                    index: Joi.number().min(0),
                    description: Joi.string()
                })
            }
        }
    },
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: taskHandler.editTask,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string()
                }),
                payload: Joi.object({
                    isMarked: Joi.boolean(),
                    userName: Joi.string(),
                    description: Joi.string()
                })
            }
        }

    },
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: taskHandler.deleteTask,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string()
                }),
            }
        }
    },

]