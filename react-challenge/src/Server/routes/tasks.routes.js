
const Joi = require("joi");
const taskHandler = require('../handlers/tasks.handler');
const taskModel = require('../models/tasks.model')


module.exports = [
    {
        method: 'GET',
        path:'/todos',
        handler: taskHandler.getTasks,
        options: {
            response: {
                schema: Joi.object({testList: Joi.array().items(taskModel.taskSchema)})

            }
        }
    },
    {
        method: 'PUT',
        path: '/todos',
        handler: taskHandler.addTask,
        response: {
            schema: taskModel.taskSchema
        }
    },
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: taskHandler.editTask,
        options: {
            response: {
                400: dataSchema,
                404: Joi.any()
            }
        }
    },
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: taskHandler.deleteTask
    }
]