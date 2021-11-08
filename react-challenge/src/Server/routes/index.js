const taskRoutes = require('./tasks.routes');
const userRoutes = require('./users.routes');

module.exports = [
    ...taskRoutes,
    ...userRoutes
];