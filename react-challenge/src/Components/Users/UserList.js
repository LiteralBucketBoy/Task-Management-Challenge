import React, {useContext} from "react";
import bodyguard from "./7b7l2tt7yu9y.png"
import "../../SPA.css";
import {UserItem} from "./UserItem";
import {UserContext} from "./UserContext";

/**
* Creates and renders the frontend of list of tasks in a table
* */
function UserList (){
    const {userList, addUser, currentToken, currentUser} = useContext(UserContext);
    const [newUser, setNewUser] = React.useState({name: "", password:"", confirmPassword:""});
    const [userTaskList, setUserTaskList] = React.useState();
    const [userNameWarning, setUsernameWarning] =  React.useState("");
    const [passwordWarning, setPasswordWarning] =  React.useState("");

    const fetchData = React.useCallback(async() => {
            await fetch('/users/'+currentUser, {
                method: 'GET',
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response =>
                response.json()
            ).then(json => {
                setUserTaskList(json.userList.map(
                    (item, index)  => (
                        <UserItem
                            key={item.uniqueId}
                            index={index}
                            user={item.userName}
                            tasks={item.taskList}
                        />
                    ) ))
            })
    }, [currentToken,currentUser])
    React.useEffect(
         fetchData
        , [fetchData, userList])

    const handleSubmit = async e => {
        e.preventDefault();
        if( newUser.name!==undefined || newUser.name!==""){
            setUsernameWarning("");
            setPasswordWarning("");
            if(userList.userList.filter(item => item.userName === newUser.name).length>0){
                setUsernameWarning("Username already exists")
            }else{
                setUsernameWarning("");
                if(newUser.password === newUser.confirmPassword && newUser.password!==""){
                    addUser(newUser,setNewUser,setUsernameWarning,setPasswordWarning,function handleClose(){})
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
                    userTaskList
                }
                </tbody>
            </table>
        </div>
    );
}

/***
 * The NoAccess() method creates a replacement HTML page for any user that isn't Admin
 * @returns {JSX.Element} Meme content for wrong user access
 * @constructor
 */
function NoAccess() {
    return (
        <div className="content" >
            <img src={bodyguard} alt="Password for admin is password"/>
            <br/>
            <label>Sorry chief but you ain't getting in unless you have access</label>
        </div>
    );
}

export {UserList, NoAccess}