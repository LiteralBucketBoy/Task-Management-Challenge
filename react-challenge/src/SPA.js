import React, {Component, useContext, useEffect, useReducer, useState} from "react";
import { Route, NavLink,HashRouter} from "react-router-dom";
import Homepage from "./Components/Homepage";
import Profile from "./Components/Profile"
import "./SPA.css";
import {TaskListInfo} from "./Components/TaskList";
import {UserContext} from "./Components/User";
import SignUp from "./Components/UserData/SignUp";
import LogIn from "./Components/UserData/LogIn";

const SPA = () =>{
    const { currentUser, setCurrentUser, userList} = useContext(UserContext);
    const [modalLogin, setModalLogin] = useState(currentUser === null || currentUser==="Guest" || userList.userList.length!==0);
    const openLogin = () => setModalLogin(!modalLogin);
    const [modalSignUp, setModalSignUp] = useState(userList.userList.length===0 && !modalLogin);

    const Toggle = () => setModalSignUp(!modalSignUp);


    if(currentUser === null) {
        setCurrentUser("Guest");
    }



    return (
            <HashRouter>
                <div>
                    <SignUp modalShow={modalSignUp} handleClose={Toggle}>
                        <p>Sign up now for this amazing task manager!</p>
                    </SignUp>
                    <LogIn modalShow={modalLogin} handleClose={openLogin}>
                        <p>Log in to see your tasks!</p>
                    </LogIn>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/support">support</NavLink></li>
                    </ul>
                    <div className="content" id="main">

                        <TaskListInfo>
                        <Route exact path="/" component={Homepage}/>
                        </TaskListInfo>
                        <Route exact path="/Profile" component={Profile}/>
                    </div>
                </div>
            </HashRouter>
        );

}




export default SPA;