const {v4: uuidv4} = require("uuid");
const {User} = require("../models/users.model");
const JWT   = require('jsonwebtoken');
const {Task} = require("../models/tasks.model");

const login = async (req, h) => {
    const user = await User.query().select('userName','password').where('userName', req.payload.logData.name);
    if(!user){
        return h.response('').code(404);
    }
    const passwordCheck = await (req.payload.logData.password === user[0].password);
    if(!passwordCheck){
        return h.response('').code(401);
    }
    const token = new Promise(resolve => {
        JWT.sign(req.payload.logData.name,'NeverShareYourSecret', function(err, token){
        if(err){
            throw new Error('ERR_INVALID_TOKEN')
        }
        resolve(token)
    })})
   return {token: await token}

}

const logout = async(req,h) => {
    const response = h.response({text: 'You used a Token!'});
    response.header("Authorization", req.headers.authorization);
    return response;
}

const getUsers = async (req,h) => {
    if(req.params.userName!=="Admin"){
        return h.response('').code(401);
    }
    const users = await User.query();// won't use relatedQuery due to frontend logic, will adapt here
    const adaptedList = JSON.parse(JSON.stringify(users));
    const tasks = await Task.query();
    const adaptedTasksList = JSON.parse(JSON.stringify(tasks));
    adaptedList.map(User =>  User.taskList = adaptedTasksList.filter(task => task.ownerId === User.uniqueId))

    return {userList: await adaptedList};

}

const addUser = async (req,h) => {
    const user = await User.query().select('userName','password').where('userName', req.payload.user.name);
    if(user.length > 0){
        return h.response('Username exists').code(409);
    }else{
        const newUserId = "u-"+ uuidv4();
        const newUserInsert = await User.query().insert({
            index:req.payload.index,
            uniqueId:newUserId,
            dateAdded: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            archived:false,
            password:req.payload.user.password,
            userName:req.payload.user.name,
        });
        return JSON.parse(JSON.stringify(newUserInsert))
    }


}


const editUser = async (req,h) => {

    const patchUser = {password: req.payload.userPassword}
    const user = await User.query()
        .select('userName','password')
        .where('userName', req.params.userName)
        .where('password',req.payload.userOldPassword)
        .patch(patchUser);
    if(!user){
        return h.response('OLDPASSWORD').code(401);
    }
    return user
}


module.exports = {
    login,
    logout,
    addUser,
    getUsers,
    editUser,
};
