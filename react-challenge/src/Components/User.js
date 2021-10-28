import React, {useContext, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {ListContext, TaskItem, TaskList} from "./TaskList";
import bodyguard from "./7b7l2tt7yu9y.png"
import "../SPA.css";

const testUserState = 'Guest';
const userListState = {
    userList :
        [{index:0,uniqueId:"u-a9a5ada1-53a1-43e9-95e4-7f2404cd647d",dateAdded:1635286127619,dateModified:1635286127619,archived:false,password:"password",userName:"Admin"}]
};
const UserContext = React.createContext(); // Creates the context of the user
const localUserState = JSON.parse(localStorage.getItem("currentUser")); //reconverts the list back to the object
const localUserListState = JSON.parse(localStorage.getItem("userList")); //reconverts the list back to the object

/**
 * Feeds the state of the list
 * */
let reducer = (currentList, newList ) => {
    if(newList === null){
        localStorage.removeItem("userList");
        return userListState;
    }
    return {...currentList, ...newList};
};
/**
 * Stores and manipulates the data of the list
 * */
function UserInfo (props){

    const [userList, setUserList] = React.useReducer(reducer,localUserListState || userListState)
    useEffect(() => {
        localStorage.setItem("userList", JSON.stringify(userList));//Stores in cache the task list
    }, [userList]);

    const [currentUser, setCurrentUser] = React.useState(localUserState || testUserState );//In case it doesn't have local list it will provide a default one
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));//Stores in cache the task list
    }, [currentUser]);


    /*
    *  Adds a new user to the list, should encrypt password, but no point to it since it's localStorage and editable
    *  */
    const addUser = user => {
        setUserList(
            userList.userList.push(
                {
                    index : userList.userList.length,
                    uniqueId : "u-" + uuidv4(),
                    dateAdded : Date.now(),
                    dateModified : Date.now(),
                    archived : false,
                    isAdmin : user.isAdmin,
                    password: user.password,
                    userName: "" + user.name
                }
            )
        );
    }

    /*
   *  Adds a new user to the list, should encrypt password, but no point to it since it's localStorage and editable
   *  */
    const setUser = user => {

        setUserList({
            userList : userList.userList.map
            (t => t.userName === user.name ? {...t, password: user.newPassword, dateModified: Date.now()}
                : t)
        });
    }

    return(
        <UserContext.Provider
            value={{currentUser, setCurrentUser, userList, setUserList, addUser, setUser}}> {props.children}
        </UserContext.Provider>

    )
}

/*
* Creates and renders the task item that represents the task
* */
function UserItem ({ user }) {
    const [userTaskList, setUserTaskList] = React.useState( )


    function getUserTaskList() {

            const userTasks = JSON.parse(localStorage.getItem("taskList"+user));
            if(userTasks!== null) {
                if (userTasks.testList !== undefined) {
                    return userTasks.testList.map(
                        (item, index) => (
                            <tr key={index} className="task-item">

                                <td>

                                    <input type="checkbox"
                                           defaultChecked={item.isMarked}
                                           value={item.isMarked}
                                           disabled={true}
                                    />

                                </td>
                                <td>
                                    <div className={item.isMarked ? "marked" : ""}>


                                        {item.taskString}

                                    </div>
                                </td>
                                <td>
                                    <div>{new Date(item.dateAdded).toUTCString()}</div>
                                </td>

                            </tr>
                        ))
                }
            }


    }

    return (
        <tr className="user-item" >
            <td>
                {user}
            </td>
            <td>
                <table>
                    <caption>{user} Tasks</caption>
                    <thead>
                    <tr>
                        <th>Done</th>
                        <th>Task </th>
                        <th>Date Added</th>
                    </tr>
                    </thead>
                    <tbody className="task-list">
                    {
                        getUserTaskList()
                    }
                    </tbody>

                </table>

            </td>

        </tr>
    )
}

/*
* Creates and renders the frontend of list of tasks in a table
* */
function UserList ({}){
    const { currentUser, setCurrentUser, userList, addUser} = useContext(UserContext);
    const [newUser, setNewUser] = React.useState({name: "", password:"", confirmPassword:""});

    const [userNameWarning, setUsernameWarning] =  React.useState("");
    const [passwordWarning, setPasswordWarning] =  React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(newUser.name)
        if( newUser.name!==undefined || newUser.name!==""){
            setUsernameWarning("");
            if(userList.userList.filter(item => item.userName === newUser.name).length>0){
                setUsernameWarning("Username already exists")
            }else{
                setUsernameWarning("");
                if(newUser.password === newUser.confirmPassword && newUser.password!==""){
                    addUser(newUser);
                    setUsernameWarning("");
                    setPasswordWarning("");
                    setNewUser({name: "", password:"", confirmPassword:""});

                }else{
                    setPasswordWarning("Passwords don't match");
                }
            }
        }else{
            setUsernameWarning("Please insert a valid user")
        }

    }

    const handleChange = e =>
        setNewUser(prevState =>  ({ ...prevState, [e.target.name]: e.target.value }));

    return (
        <div className="content" id={"newUser"}>
            <h1>New User</h1>
            <form className="addUser" onSubmit={handleSubmit} >
                    <input key="userName" name="name"  placeholder="Write username here...." value={newUser.name} onChange={handleChange}  required/>
                    <input key="password" name="password" placeholder="New password" value={newUser.password} onChange={handleChange}  required/>
                    <input key="confirmPassword" name="confirmPassword" placeholder="Confirm password" value={newUser.confirmPassword} onChange={handleChange}  required/>
                    <button className="addBtn" type="button" onClick={handleSubmit}>
                        Add User
                    </button>
                    <label className="warning">{passwordWarning}</label>
                    <label className="warning">{userNameWarning}</label>
                </form>

            <table>
                <caption>Users</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Tasks</th>
                </tr>
                </thead>
                <tbody className="user-list">
                {
                    userList.userList.map(
                    (item, index) => (
                    <UserItem
                    key={item.uniqueId}
                    index={index}
                    user={item.userName}
                    />
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}


function NoAccess() {
    return (
        <div className="content" >
            <img src={bodyguard} alt="Password for admin is password"/>
            <br></br>
            <label>Sorry chief but you ain't getting in unless you have access</label>
        </div>
    );
}

export {UserInfo,UserContext, UserList, NoAccess}