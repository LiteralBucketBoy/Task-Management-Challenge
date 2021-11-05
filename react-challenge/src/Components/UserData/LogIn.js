import React, { useContext} from "react";
import './modal.css';
import {UserContext} from "../User";
import openeye from "./openeye.png";
import closedeye from "./closed-eye.png";

const LogIn = ({ modalShow, handleClose, handleSignUp }) => {
    const toggleClass = modalShow ? "modal display-block": "modal display-none";
    const {  setCurrentUser, userList, setCurrentToken, currentToken} = useContext(UserContext);

    const [logData, setLogData] = React.useState({password:""});

    const [logWarning, setLogWarning] =  React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ logData })
        };
        if(logData.name!==null || logData.name!== "" ){
            setLogWarning("");
            fetch('/login', requestOptions)
                .then(response =>
                    response.json()
                ).then(json => {
                    setCurrentUser(logData.name);
                    setCurrentToken(json.token);
                    setLogWarning("");
                    setLogData({});
                    handleClose();
                    return json;
                }).catch(err => {
                if(userList.userList.filter(item => item.userName === logData.name).length===0){
                    setLogWarning("Username doesn't exist")
                }else{
                    setLogWarning("");
                    const user = userList.userList.find(item => item.userName === logData.name)

                    if(logData.password !== "" && logData.password===user.password){
                        setCurrentUser(logData.name);

                    }else{
                        setLogWarning("Password is incorrect");
                    }
                }
            });

        }else{
            setLogWarning("Login invalid")
        }

    }

    const handleChange = e =>
        setLogData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const [showPassword, setshowPassword] = React.useState(false);

    const toggleShow = () => {
        setshowPassword(!showPassword);
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
                    <button  type="button" className="showPasswordBtn"  onClick={toggleShow}><img className="showPassword" alt="Show Password" src={showPassword ? openeye : closedeye}/> </button>
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