
import React, {useEffect} from "react";
import {localToken, localUserListState, UserContext, localUserState, testUserState, userListState} from "./UserContext";



/***
 * Feeds the state of the list
 */
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
export function UserInfo (props){

    const [userList, setUserList] = React.useReducer(reducer,localUserListState || userListState)
    useEffect(() => {
        localStorage.setItem("userList", JSON.stringify(userList));//Stores in cache the task list
    }, [userList]);

    const [currentUser, setCurrentUser] = React.useState(localUserState || testUserState );//In case it doesn't have local list it will provide a default one
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));//Stores in cache the task list
    }, [currentUser]);


    const [currentToken, setCurrentToken] = React.useState(localToken);
    useEffect(() => {
        localStorage.setItem("currentToken", JSON.stringify(currentToken));
    }, [currentToken]);
    const getUsers = React.useCallback( async () => {
        if(currentUser==="Guest"){return }
            await fetch('/users/'+currentUser, {
                method: 'GET',
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response =>
                response.json()
            ).then(json => {
                setUserList(json)
            })
        }
        , [currentUser,currentToken])

    React.useEffect(getUsers,[getUsers])
    /***
     * Adds a new user to the list, should encrypt password, but no point to it since it's localStorage and editable
     *
     */
    async function addUser(user,setNewUser,setUsernameWarning,setPasswordWarning,handleClose){
        const checkSignup = (currentUser==="Guest") ? "/signUp" : "";
        await fetch('/users'+checkSignup, {
            method: 'PUT',
            body: JSON.stringify({
                index: userList.userList.length,
                user: user
            }),
            headers: {
                "Authorization" : currentToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async response => {
            if(response.status === 409){
                setUsernameWarning("Username already exists");
            }else{
                setUsernameWarning("");
                setPasswordWarning("");
                setNewUser({name: "", password:"", confirmPassword:""});
                handleClose();
                const newUser = await response.json()
                console.log(newUser)
                userList.userList.push(newUser)
                setUserList(
                    userList
                );
            }
        })
    }

    /**
     *  Adds a new user to the list, should encrypt password, but no point to it since it's localStorage and editable
     *  */
    async function setUser(user){
        await fetch('/user/'+user.name, {
            method: 'PATCH',
            body: JSON.stringify({
                userPassword: user.newPassword,
                userOldPassword: user.oldPassword
            }),
            headers: {
                "Authorization" : currentToken,
                "Content-type": "application/json; charset=UTF-8"
            }
        });

    }

    return(
        <UserContext.Provider
            value={{currentUser, setCurrentUser, userList, setUserList, addUser, setUser, currentToken, setCurrentToken}}> {props.children}
        </UserContext.Provider>

    )
}

