const {v4: uuidv4} = require("uuid");
const testUserState = 'Guest';
const userListState = {
    userList :
        [{index:0,uniqueId:"u-a9a5ada1-53a1-43e9-95e4-7f2404cd647d",dateAdded:1635286127619,dateModified:1635286127619,archived:false,password:"password",userName:"Admin"}]
};
let testState = {
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

const getTasks = (req,h) => {
    let newList = [];
    let filter = req.query.filter;
    let order = (a,b)=> a.dateAdded < b.dateAdded ? 1 : -1;

    if(req.query.orderBy === 'DESCRIPTION'){
        order = (a,b)=> a.taskString > b.taskString ? 1 : -1
    }

    if(filter === 'COMPLETE'){
        return {testList: testState.testList.filter(item => !item.archived && item.isMarked===true).sort(order)}
    }else if(filter === 'INCOMPLETE'){
        return {testList: testState.testList.filter(item => !item.archived && item.isMarked===false).sort(order)}
    }else{
        return {testList: testState.testList.filter(item => !item.archived).sort(order)};
    }


}

const addTask = (req,h) => {

    const body =  {
        index : req.payload.index,
        uniqueId : "t-" + uuidv4(),
        isMarked : false,
        dateAdded : Date.now(),
        dateModified : Date.now(),
        archived : false,
        taskString: ""+req.payload.description
    };
    testState.testList.push(body)
    return body
}


const editTask = (req,h) => {
    let body = {} ;
    if(req.payload.isMarked!==null && req.payload.isMarked!==undefined ){
        body =  {
            uniqueId : req.params.id,
            isMarked : !JSON.parse(req.payload.isMarked),
        };
        testState = {testList: testState.testList.map(t => t.uniqueId === req.params.id ? {...t, isMarked: !t.isMarked, dateModified: Date.now()} : t)}
    }else{
        body =  {
            uniqueId : req.params.id,
            taskString: ""+req.payload.description
        };
        testState = {testList :testState.testList.map(t => t.uniqueId ===  req.params.id ? {...t, taskString: req.payload.description, dateModified: Date.now()} : t)}
    }

    return body
}


const deleteTask = (req,h) => {
    testState = {testList :testState.testList.filter(t => t.uniqueId !== req.params.id)};
    return {}
}

module.exports = {
    addTask,
    getTasks,
    editTask,
    deleteTask,
};
