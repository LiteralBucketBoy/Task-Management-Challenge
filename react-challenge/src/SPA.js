import React, {Component, useContext, useEffect, useReducer, useState} from "react";
import {Route, NavLink, HashRouter, useLocation, Switch, BrowserRouter, useHistory, Link} from "react-router-dom";
import Homepage from "./Components/Homepage";
import Profile from "./Components/Profile"
import "./SPA.css";
import {TaskListInfo} from "./Components/TaskList";
import {NoAccess, UserContext, UserList} from "./Components/User";
import SignUp from "./Components/UserData/SignUp";
import LogIn from "./Components/UserData/LogIn";
import Logo from "./Components/logo192.png"


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
            return  <li className="logOut" type="button" onClick={handleSignOut}> <span>Log out </span></li>
        }else{
            return  <li className="logOut" type="button" onClick={openLogin}><span>Login </span></li>
        }
    }
 ;
    function isAdminGiveLink(){
        return currentUser==="Admin" ? <li className={activeTab === 4 ? "navbar--link-item active" : ""} onClick={()=>onTabChange(4)}><Link to="/users">Users</Link></li> : "";
    }

    const [activeTab, setActiveTab] = React.useState(1);

    function onTabChange(tab){
        setActiveTab(tab);
    }

    return (


            <BrowserRouter>
                <main>
                <nav className="navbar">
                    <div className="navbar--logo-holder">
                        <img src={Logo} alt="logo" className="navbar--logo" />
                        <h1>Super Mega Best Task App</h1><p>(No refunds)!</p>
                      </div>
                    <SignUp modalShow={modalSignUp} handleClose={Toggle}>
                        <p>Sign up now for this amazing task manager!</p>
                    </SignUp>
                    <LogIn modalShow={modalLogin} handleClose={openLogin} handleSignUp={Toggle}>
                        <p>Log in to see your tasks!</p>
                    </LogIn>

                    <ul className="navbar--link">
                        <li className={activeTab === 1 ? "active" : ""} onClick={()=>onTabChange(1)}><Link to="/">Tasks</Link></li>
                        <li className={activeTab === 2 ? "active" : ""} onClick={()=>onTabChange(2)}><Link to="/Profile">Profile</Link></li>
                        {isAdminGiveLink()}
                        {logOutCheck()}
                    </ul>
                </nav>
                <LoadPage/>
                </main>
            </BrowserRouter>
        );

}
function LoadPage() {
    const { currentUser, setCurrentUser, userList} = useContext(UserContext);
    const currentPage = useLocation();
    const [showingPage, setShowingPage] = useState(currentPage);
    const [fade, setFade] = useState("slideIn");

    useEffect(() => {
        if (currentPage !== showingPage) setFade("slideOut");

    }, [currentPage]);

    function isAdminGivePage(){
        return currentUser==="Admin" ? UserList : NoAccess;
    }

    return (
        <div
            className={`${fade}`}
            onAnimationEnd={() => {
                if (fade === "slideOut") {
                    setFade("slideIn");
                    setShowingPage(currentPage);
                }
            }}
        >
            <Switch location={showingPage}>
                <Route exact path="/Profile" component={Profile}/>
                <Route exact path="/Users" component={isAdminGivePage()}/>
                <TaskListInfo>
                    <Route exact path="/" component={Homepage}/>
                </TaskListInfo>

            </Switch>
        </div>
    );
}



export default SPA;