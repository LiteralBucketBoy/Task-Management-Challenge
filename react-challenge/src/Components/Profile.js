import {UserContext} from "./User";
import React, {useContext, useEffect} from "react";





const Profile = () => {
    const { currentUser, setCurrentUser} = useContext(UserContext);



    return (
        <React.Fragment >
            <h1>User</h1>
            {currentUser}
        </React.Fragment>
    );
};




export  default Profile;