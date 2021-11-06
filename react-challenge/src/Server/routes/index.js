const taskRoutes = require('./tasks.routes');
const userRoutes = require('./users.routes');
const userHandler = require("../handlers/users.handler");

module.exports = [
    ...taskRoutes,
    ...userRoutes
];