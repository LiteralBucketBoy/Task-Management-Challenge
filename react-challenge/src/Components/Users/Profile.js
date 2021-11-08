import {UserContext} from "./UserContext";
import React, {useContext} from "react";
import openEye from "./Auth/openeye.png";
import closedEye from "./Auth/closed-eye.png";
import {checkPasswordValidity} from "./Auth/PasswordValidator";


const Profile = () => {
    const { currentUser, currentToken} = useContext(UserContext);
    const [saveWarning, setSaveWarning] =  React.useState("");
    const [passwordWarning, setPasswordWarning] =  React.useState("");
    const [newUser, setNewUser] = React.useState({name:currentUser,oldPassword: "", newPassword : "", confirmPassword: ""});

    const handleSubmit = async e => {
        e.preventDefault();
        setSaveWarning("");
        if(newUser.oldPassword === ""){
            setPasswordWarning("Old Password is required")
            return
        }
        if(newUser.newPassword === "" || checkPasswordValidity(newUser.newPassword)){
            setPasswordWarning(checkPasswordValidity(newUser.newPassword))
             return
        }
            if(newUser.newPassword === newUser.confirmPassword){
                // setUser(newUser) doesnt pass on context
               await fetch('/user/'+newUser.name, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        userPassword: newUser.newPassword,
                        userOldPassword: newUser.oldPassword
                    }),
                    headers: {
                        "Authorization" : currentToken,
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then((response) => {
            if(response.status === 401){
                setPasswordWarning("Old Password is incorrect");
            }else{
                setPasswordWarning("");
                setNewUser({name:currentUser, oldPassword: "", newPassword:"", confirmPassword:""});
                setSaveWarning("Saved Changes");
            }
            });
        }else{
            setPasswordWarning("Passwords don't match");
        }
    }

    const handleChange = e =>
        setNewUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShow = () => {
        setShowPassword(!showPassword);
    };

    /***
     * Checks if user isn't in Guest Mode, which doesn't have the same functionalities
     * @returns {JSX.Element} Elements that provide Password change functionalities
     */
    function guestCheck(){
        if(currentUser !== null && currentUser!=="Guest"){
            return <><h1 className=""> Change your password</h1>
            <label className="saveWarning">{saveWarning}</label>
            <br/>
            <label>Old Password</label>
            <input type={showPassword ? "text" : "password"}  key="oldPassword" name="oldPassword" value={newUser.oldPassword} onChange={handleChange}  required/>
            <br/>
            <label>New Password</label>
            <input type={showPassword ? "text" : "password"}  key="newPassword" name="newPassword" value={newUser.newPassword} onChange={handleChange}  required/>
            <br/>
            <label>Confirm New Password</label>
            <input type={showPassword ? "text" : "password"}  key="confirmPassword" name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange}  required/>
            <label className="warning">{passwordWarning}</label>
            <br/>
            <button type="button" className="showPasswordChangeBtn" onClick={toggleShow}><img className="showPassword" alt="Show Password" src={showPassword ? openEye : closedEye}/> Show passwords</button>
            <br/>
            <button className="signInBtn" type="button" onClick={handleSubmit}>
                Save change
            </button>
            <br/></>
        }else{
            return <p>Login for more!</p>
        }
    }

    return (
        <React.Fragment >
            <section className="contentProfile"  >

                <form className="form-box" onSubmit={handleSubmit}>
                    <h1>User </h1>
                    <label> {currentUser}</label>
                    {guestCheck()}
                    <br/>
                    <button type="button" onClick={() =>  {localStorage.clear() ;window.location.reload();}}>
                        Reset Cache
                    </button>
                </form>
            </section>
        </React.Fragment>
    );
};
export  default Profile;