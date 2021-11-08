import React from "react";

export const testUserState = 'Guest';
export const userListState = {
    userList :
        [{index:0,uniqueId:"u-a9a5ada1-53a1-43e9-95e4-7f2404cd647d",dateAdded:1635286127619,dateModified:1635286127619,archived:false,password:"password",userName:"Admin"}]
};
export const UserContext = React.createContext(); // Creates the context of the user
export const localUserState = JSON.parse(localStorage.getItem("currentUser")); //reconverts the list back to the object
export const localUserListState = JSON.parse(localStorage.getItem("userList")); //reconverts the list back to the object
export const localToken = JSON.parse(localStorage.getItem("currentToken"));