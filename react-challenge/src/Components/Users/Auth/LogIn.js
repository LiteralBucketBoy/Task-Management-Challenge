import React, { useContext} from "react";
import './modal.css';
import {UserContext} from "../UserContext";
import openEye from "./openeye.png";
import closedEye from "./closed-eye.png";

const LogIn = ({ modalShow, handleClose, handleSignUp }) => {
    const toggleClass = modalShow ? "modal display-block": "modal display-none";
    const {  setCurrentUser, setCurrentToken} = useContext(UserContext);

    const [logData, setLogData] = React.useState({name:"",password:""});

    const [logWarning, setLogWarning] =  React.useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logData })
        };
        if(logData.name!==null && logData.name!== "" && logData.password!== ""){
            setLogWarning("");
            await fetch('/login', requestOptions)
                .then(response => {
                    if(response.status === 404){
                        setLogWarning("Username doesn't exists");
                    }else if(response.status === 401){
                        setLogWarning("Password is incorrect");
                    }else{
                        response.json().then(json => {
                            setCurrentUser(logData.name);
                            setCurrentToken(json.token);
                            setLogWarning("");
                            setLogData({name:"",password:""});
                            handleClose();
                            return json;
                        })
                    }
                })
        }else{
            setLogWarning("Login invalid");
        }

    }

    const handleChange = e =>
        setLogData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShow = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div  id="login" className={toggleClass}>
            <section className="modal-main">

                <form className="form-box" onSubmit={handleSubmit}>
                    <h1 className=""> Sign In</h1>

                    <label>Username</label>
                    <input key="userName" name="name" value={logData.name} onChange={handleChange}  required/>

                    <label>Password</label>
                    <input type={showPassword ? "text" : "password"}  key="password" name="password" value={logData.password} onChange={handleChange}  required/>
                    <button  type="button" className="showPasswordBtn"  onClick={toggleShow}><img className="showPassword" alt="Show Password" src={showPassword ? openEye : closedEye}/> </button>
                    <br/>
                    <label className="warning">{logWarning}</label>

                    <button className="signInBtn" type="button" onClick={handleSubmit}>
                        Sign in
                    </button>
                </form>
                <div  className="form-box">
                    <button className="signUpBtn" type="button" onClick={handleSignUp}>
                        Sign up
                    </button>
                    <button className="continueGuestBtn" type="button" onClick={handleClose}>
                        Guest Mode
                    </button>
                </div>

            </section>
        </div>
    );
};

export default LogIn;