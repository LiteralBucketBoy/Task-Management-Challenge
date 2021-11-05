const {v4: uuidv4} = require("uuid");
const {User} = require("../models/users.model");
const JWT   = require('jsonwebtoken');

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

const logout = (req,h) => {
    const response = h.response({text: 'You used a Token!'});
    response.header("Authorization", req.headers.authorization);
    return response;
}

const getUsers = (req,h) => {
    const response = h.response({text: 'You used a Token!'});
    response.header("Authorization", req.headers.authorization);
    return response;
}

const addUser = (req,h) => {

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


const editUser = (req,h) => {
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


module.exports = {
    login,
    logout,
    addUser,
    getUsers,
    editUser,
};
