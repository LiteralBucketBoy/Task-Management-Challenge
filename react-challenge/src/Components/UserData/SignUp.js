import React, {Component, useCallback, useContext, useEffect} from "react";
import './modal.css';
import {UserContext} from "../User";
import {AES} from "crypto-js";


const SignUp = ({ modalShow,handleClose }) => {
    const toggleClass = modalShow ?  "modal display-block": "modal display-none";
    const { currentUser, setCurrentUser, userList, addUser} = useContext(UserContext);
    const [formIsValid, setFormValid] = React.useState(false);
    const [newUser, setNewUser] = React.useState({});

    const [userNameWarning, setUsernameWarning] =  React.useState("");
    const [passwordWarning, setPasswordWarning] =  React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if(newUser.name!==null || newUser.name!== "" ){
            setUsernameWarning("");
            if(userList.userList.filter(item => item.userName === newUser.name).length>0){
                setUsernameWarning("Username already exists")
            }else{
                setUsernameWarning("");
                if(newUser.password === newUser.confirmPassword){
                    addUser(newUser);
                    setUsernameWarning("");
                    setPasswordWarning("");
                    setNewUser({});
                    handleClose();
                }else{
                    setPasswordWarning("Passwords don't match");
                }
            }
        }else{
            setUsernameWarning("Please Insert a valid name")
        }

    }

    const handleChange = e =>
        setNewUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    return (
        <div id="signup" className={toggleClass}>
            <section className="modal-main">
                <form onSubmit={handleSubmit}>
                    <input key="userName" name="name" value={newUser.name} onChange={handleChange}  required/> <label className="warning">{userNameWarning}</label>
                    <input key="password" name="password" value={newUser.password} onChange={handleChange}  required/> <label className="warning">{passwordWarning}</label>
                    <input key="confirmPassword" name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange}  required/> <label className="warning">{passwordWarning}</label>
                    <button type="button" onClick={handleSubmit}>
                        Sign up
                    </button>
                </form>
                <button type="button" onClick={handleClose}>
                    Log in
                </button>
            </section>
        </div>
    );
};

export default SignUp;