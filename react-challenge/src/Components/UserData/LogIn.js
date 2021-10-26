import React, {Component, useContext, useEffect} from "react";
import './modal.css';
import {UserContext} from "../User";

const LogIn = ({ modalShow, handleClose, handleSignUp }) => {
    const toggleClass = modalShow ? "modal display-block": "modal display-none";
    const { currentUser, setCurrentUser, userList} = useContext(UserContext);

    const [logData, setLogData] = React.useState({});

    const [logWarning, setLogWarning] =  React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if(logData.name!==null || logData.name!== "" ){
            setLogWarning("");
            if(userList.userList.filter(item => item.userName === logData.name).length===0){
                setLogWarning("Username doesnt exist")
            }else{
                setLogWarning("");
                if(logData.password !== ""){
                    setCurrentUser(logData.name);
                    setLogWarning("");
                    setLogData({});
                    handleClose();
                }else{
                    setLogWarning("Passwords is incorrect");
                }
            }
        }else{
            setLogWarning("Login invalid")
        }

    }

    const handleChange = e =>
        setLogData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


    return (
        <div  id="login" className={toggleClass}>
            <section className="modal-main">
                <form onSubmit={handleSubmit}>
                    <label className="warning">{logWarning}</label>
                    <input key="userName" name="name" value={logData.name} onChange={handleChange}  required/>
                    <input key="password" name="password" value={logData.password} onChange={handleChange}  required/>
                      <button type="button" onClick={handleSubmit}>
                        Sign in
                    </button>
                </form>
                <button type="button" onClick={handleSignUp}>
                    Sign up
                </button>
                <button type="button" onClick={handleClose}>
                    Continue as Guest
                </button>
            </section>
        </div>
    );
};

export default LogIn;