
const Joi = require("joi");
const taskHandler = require('../handlers/tasks.handler');
const taskModel = require('../schemas/tasks.schema')


module.exports = [
    {
        method: 'GET',
        path:'/todos/{userName}/{filter?}',
        handler: taskHandler.getTasks,
        options: {
            response: {
                schema: Joi.object({testList: Joi.array().items(taskModel.taskSchema)})

            }
        }
    },
    {
        method: 'PUT',
        path: '/todos/{userName}',
        handler: taskHandler.addTask,
        options: {
            response: {
                schema: taskModel.taskSchema

            }
        }

    },
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: taskHandler.editTask

    },
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: taskHandler.deleteTask
    },

]