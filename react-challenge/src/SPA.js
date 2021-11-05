import React, { useContext, useEffect,  useState} from "react";
import {Route,   useLocation, Switch, BrowserRouter,  Link} from "react-router-dom";
import Homepage from "./Components/Homepage";
import Profile from "./Components/Profile"
import "./SPA.css";
import {TaskListInfo} from "./Components/TaskList";
import {NoAccess, UserContext, UserList} from "./Components/User";
import SignUp from "./Components/UserData/SignUp";
import LogIn from "./Components/UserData/LogIn";
import Logo from "./Components/logo192.png"

/**
* Replaces the default App, defines and renders a SPA
* */
const SPA = () =>{


    const { currentUser, setCurrentUser,currentToken, setCurrentToken} = useContext(UserContext);
    useEffect(()=>{
        logOutCheck();
        }
     ,[currentUser]);

    const [modalLogin, setModalLogin] = useState(currentUser === null || currentUser==="Guest");
    const [modalSignUp, setModalSignUp] = useState(!modalLogin && currentUser==="Guest");
    const openLogin = () => setModalLogin(!modalLogin); /**toggles the login Modal**/
    const Toggle = () => {setModalSignUp(!modalSignUp); openLogin()}; /**toggles the signup modal, switching from login*/

    /**
    * If user logs out, sets to Guest Mode as default
    * */
    const handleSignOut = async e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { "Authorization" : currentToken, 'Content-Type': 'application/json' },
        };
        await fetch('/logout', requestOptions)
            .then(response =>
                response.json()
            ).then(json => {
            setCurrentUser("Guest");
            setCurrentToken('');
            console.log(json)
            window.location.reload();
        })

    }

    /**
     * Switches the button for login if user logs out and vice-versa
     * @returns JSX.Element list item for login/logout
     * */
    function logOutCheck(){
        if(currentUser !== null && currentUser!=="Guest"){
            return  <li className="logOut" type="button" onClick={handleSignOut}> <span>Log out </span></li>
        }else{
            return  <li className="logOut" type="button" onClick={openLogin}><span>Login </span></li>
        }
    }

    /***
     * Checks if user is Admin, adding a new tab in the navbar
     * @returns JSX.Element list item with the link for the users tab
     */
    function isAdminGiveLink(){
        return currentUser==="Admin" ? <li className={activeTab === 4 ? "navbar--link-item active" : ""} onClick={()=>onTabChange(4)}><Link to="/users">Users</Link></li> : "";
    }

    const [activeTab, setActiveTab] = React.useState(1);

    /***
     * Sets the tab as active
     * @param tab integer that represents the tab selected
     */
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

/**
 * Loads the Routes for the components
 * @returns {JSX.Element}
 * @constructor
 */
function LoadPage() {
    const { currentUser} = useContext(UserContext);
    const currentPage = useLocation();
    const [showingPage, setShowingPage] = useState(currentPage);
    const [fade, setFade] = useState("slideIn");

    useEffect(() => {
        if (currentPage !== showingPage) setFade("slideOut");

    }, [currentPage]);

    /***
     * Checks if user is Admin and provides the adequate component
     * @returns {(function(): *)|*}  component: UserList or NoAccess
     */
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