import React, {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import CryptoJS from "crypto-js";

const testUserState = 'Guest';
const userListState = { userList : []};
const UserContext = React.createContext(); // Creates the context of the user
const localUserState = JSON.parse(localStorage.getItem("currentUser")); //reconverts the list back to the object
const localUserListState = JSON.parse(localStorage.getItem("userList")); //reconverts the list back to the object

/**
 * Stores and manipulates the data of the list
 * */
function UserInfo (props){

    const [userList, setUserList] = React.useState(localUserListState || userListState)
    useEffect(() => {
        localStorage.setItem("userList", JSON.stringify(userList));//Stores in cache the task list
    }, [userList]);

    const [currentUser, setCurrentUser] = React.useState(localUserState || testUserState );//In case it doesn't have local list it will provide a default one
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));//Stores in cache the task list
    }, [currentUser]);


    /*
    *  Adds a new user to the list
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

    return(
        <UserContext.Provider
            value={{currentUser, setCurrentUser, userList, setUserList, addUser}}> {props.children}
        </UserContext.Provider>

    )
}

export {UserInfo,UserContext }