const {v4: uuidv4} = require("uuid");
const {Task} = require('../models/tasks.model')
const {User} = require("../models/users.model");


const getTasks = async (req,h) => {
    const user = await User.query().select('uniqueId','userName','password').where('userName', req.params.userName);
    const tasks = await Task.query().where('ownerId', user[0].uniqueId);

    const adaptedList = JSON.parse(JSON.stringify(tasks));
    console.log(adaptedList)
    let filter = req.query.filter;
    let order = (a,b)=> a.dateAdded < b.dateAdded ? 1 : -1;
    if(req.query.orderBy === 'DESCRIPTION'){
        order = (a,b)=> a.taskString > b.taskString ? 1 : -1
    }

    if(filter === 'COMPLETE'){
        return {testList: adaptedList.filter(item => !item.archived && item.isMarked===true).sort(order)}
    }else if(filter === 'INCOMPLETE'){
        return {testList: adaptedList.filter(item => !item.archived && item.isMarked===false).sort(order)}
    }else{
        return {testList: adaptedList.filter(item => !item.archived).sort(order)};
    }

}

const addTask = async (req,h) => {
    const user = await User.query().select('uniqueId','userName','password').where('userName', req.params.userName);
    const body =  {
        index : req.payload.index,
        uniqueId : "t-" + uuidv4(),
        isMarked : false,
        dateAdded : new Date().toISOString(),
        dateModified : new Date().toISOString(),
        archived : false,
        taskString: ""+req.payload.description,
        ownerId: user[0].uniqueId
    };
    const newTask = await Task.query().insert(body);
    console.log(newTask)
    return body
}


const editTask = async (req,h) => {
    let body = {} ;
    let taskPatches = {dateModified: new Date().toISOString()};

    if(req.payload.isMarked!==null && req.payload.isMarked!==undefined ){
        body =  {
            uniqueId : req.params.id,
            isMarked : !JSON.parse(req.payload.isMarked),
        };
         taskPatches = {...taskPatches, isMarked: !JSON.parse(req.payload.isMarked)}
    }else{
        body =  {
            uniqueId : req.params.id,
            taskString: ""+req.payload.description
        };
        taskPatches = {...taskPatches, taskString: req.payload.description}
    }
    const task = await Task.query().findById(req.params.id);
    if(!task){
        return h.response(body).code(404)
    }else if((task.isMarked && !body.isMarked) || !task.isMarked)
    {
        const taskPatched = await Task.query().findById(req.params.id).patch(taskPatches);
        console.log(taskPatched)
    }else{
        return h.response(body).code(400)
    }

        return body
}


const deleteTask = async (req,h) => {
    const tasks = await Task.query().deleteById(req.params.id);
    console.log(tasks)
    return {}
}


module.exports = {
    addTask,
    getTasks,
    editTask,
    deleteTask,
};
