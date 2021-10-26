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
    useEffect(()=>{
        logOutCheck();
        }
     ,[currentUser]);
    const [modalLogin, setModalLogin] = useState(currentUser === null || currentUser==="Guest");
    const openLogin = () => setModalLogin(!modalLogin);
    const [modalSignUp, setModalSignUp] = useState(!modalLogin && currentUser==="Guest");

    const Toggle = () => {setModalSignUp(!modalSignUp); openLogin()};


    const handleSignOut = e => {
        e.preventDefault();
        setCurrentUser("Guest");
        window.location.reload();
    }


    function logOutCheck(){
        if(currentUser !== null && currentUser!=="Guest"){
            return  <button type="button" onClick={handleSignOut}> Logout</button>
        }else{
            return  <button type="button" onClick={openLogin}> Log In</button>
        }
    }


    return (
            <HashRouter>
                <div>
                    <SignUp modalShow={modalSignUp} handleClose={Toggle}>
                        <p>Sign up now for this amazing task manager!</p>
                    </SignUp>
                    <LogIn modalShow={modalLogin} handleClose={openLogin} handleSignUp={Toggle}>
                        <p>Log in to see your tasks!</p>
                    </LogIn>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Tasks</NavLink></li>

                        <li><NavLink to="/profile">Profile</NavLink></li>
                        {logOutCheck()}
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