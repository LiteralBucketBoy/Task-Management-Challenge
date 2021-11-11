import React, { useContext} from "react";
import './modal.css';
import closedEye from "./closed-eye.png";
import openEye from "./openeye.png";
import {UserContext} from "../UserContext";

const SignUp = ({ modalShow,handleClose }) => {
    const toggleClass = modalShow ?  "modal display-block": "modal display-none";
    const { userList, addUser} = useContext(UserContext);
    const [newUser, setNewUser] = React.useState({name: "", password:"", confirmPassword:""});

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
                    addUser(newUser,setNewUser,setUsernameWarning,setPasswordWarning,handleClose);
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
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShow = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div   id="signup" className={toggleClass}>
            <section  className="modal-main">
                <form className="form-box" onSubmit={handleSubmit}>
                    <h1 className=""> Sign Up</h1>
                    <label>Username</label>
                    <input key="userName" name="name" value={newUser.name} onChange={handleChange}  required/>
                    <label className="warning">{userNameWarning}</label>
                    <br/>
                    <label>Password</label>
                    <input type={showPassword ? "text" : "password"}  key="password" name="password" value={newUser.password} onChange={handleChange}  required/>
                    <label className="warning">{passwordWarning}</label>
                    <br/>
                    <label>Confirm Password</label>
                    <input type={showPassword ? "text" : "password"}  key="confirmPassword" name="confirmPassword" value={newUser.confirmPassword} onChange={handleChange}  required/>
                    <label className="warning">{passwordWarning}</label>
                    <button type="button" className="showPasswordsBtn" onClick={toggleShow}><img className="showPassword" alt="Show Password" src={showPassword ? openEye : closedEye}/></button>
                    <button className="signInBtn" type="button" onClick={handleSubmit}>
                        Sign up
                    </button>
                </form>
                <div  className="form-box">
                <button  className="signInBtn" type="button" onClick={handleClose}>
                    Log in
                </button>
                </div>
            </section>
        </div>
    );
};

export default SignUp;