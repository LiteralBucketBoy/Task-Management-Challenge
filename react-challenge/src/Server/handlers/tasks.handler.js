const {v4: uuidv4} = require("uuid");
const create = (req,h) => {
    return 'Create task';
}

const testUserState = 'Guest';
const userListState = {
    userList :
        [{index:0,uniqueId:"u-a9a5ada1-53a1-43e9-95e4-7f2404cd647d",dateAdded:1635286127619,dateModified:1635286127619,archived:false,password:"password",userName:"Admin"}]
};
const testState = {
        testList: [
            {
                index : 0,
                uniqueId : "t-" + uuidv4(),
                isMarked : true,
                dateAdded : Date.now(),
                dateModified : Date.now(),
                archived : false,
                taskString: "Add new task"
            },

            {
                index : 1,
                uniqueId : "t-"+ uuidv4(),
                isMarked : false,
                dateAdded : Date.now(),
                dateModified : Date.now(),
                archived : false,
                taskString: "Edit task"
            },

            {
                index : 2,
                uniqueId : "t-" + uuidv4(),
                isMarked : false,
                dateAdded : Date.now(),
                dateModified : Date.now(),
                archived : false,
                taskString: "Complete task"
            }
        ],
        User : "Guest"
    }
;

const getDefaultTasks = (req,h) => {
    return testState;
}

const addTask = (req,h) => {
    return  {
        index : req.payload.index,
        uniqueId : "t-" + uuidv4(),
        isMarked : false,
        dateAdded : Date.now(),
        dateModified : Date.now(),
        archived : false,
        taskString: ""+req.payload.description
    };
}

module.exports = {
    create,
    addTask,
    getDefaultTasks,
};
