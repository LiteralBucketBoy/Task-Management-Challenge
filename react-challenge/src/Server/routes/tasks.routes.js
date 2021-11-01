
const taskHandler = require('../handlers/tasks.handler');

module.exports = [
    {
        method: 'GET',
        path:'/tasks',
        handler: taskHandler.getDefaultTasks

    },
    {
        method: 'PUT',
        path: '/tasks',
        handler: taskHandler.addTask
    }
]