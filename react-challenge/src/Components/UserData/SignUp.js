import React, {Component, useCallback, useContext, useEffect} from "react";
import './modal.css';
import {UserContext} from "../User";
import {AES} from "crypto-js";
const userTemp = {name : "", password:"", confirmPassword:""}

const SignUp = ({ modalShow,handleClose }) => {
    const toggleClass = modalShow ?  "modal display-block": "modal display-none";
    const { currentUser, setCurrentUser, userList, addUser} = useContext(UserContext);
    const {formIsValid, setFormValid} = React.useState(false);
    const {newUser, setNewUser} = React.useState(userTemp);

    let userNameWarning, passwordWarning = "";


    const handleSubmit = e => {
        e.preventDefault();
        if(newUser.name!==null || newUser.name!== "" ){
            if(userList.userList.contains(newUser.name)){
                userNameWarning = "Username already exists"
            }else{
                if(newUser.password === newUser.confirmPassword){
                    addUser(newUser);
                }
            }
        }else{
            userNameWarning = "Please Insert a valid name"
        }

    }

    const handleChange = useCallback(
        ({target:{name,value}}) => setNewUser(state => ({ ...state, [name]:value }), [])
    );

    return (
        <div id="signup" className={toggleClass}>
            <section className="modal-main">
                <form onSubmit={handleSubmit}>
                    <input key="userName" name="name" onChange={handleChange} value={userTemp.name} required/> <label className="warning">{userNameWarning}</label>
                    <input key="password" name="password" onChange={handleChange} value={userTemp.password} required/> <label className="warning">{passwordWarning}</label>
                    <input key="confirmPassword" name="confirmPassword" onChange={handleChange} value={userTemp.password} required/> <label className="warning">{passwordWarning}</label>
                    <button type="button" onClick={handleSubmit}>
                        Sign up
                    </button>
                </form>
                <button type="button" onClick={handleClose}>
                    Continue as Guest
                </button>
            </section>
        </div>
    );
};

export default SignUp;