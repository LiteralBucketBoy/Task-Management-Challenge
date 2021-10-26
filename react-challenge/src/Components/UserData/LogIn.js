import React, {Component, useContext} from "react";
import './modal.css';
import {UserContext} from "../User";

const LogIn = ({ modalShow, handleClose }) => {
    const toggleClass = modalShow ? "modal display-block": "modal display-none";
    const { currentUser, setCurrentUser} = useContext(UserContext);

    const handleSubmit = e => {
        e.preventDefault();

    }

    return (
        <div  id="login" className={toggleClass}>
            <section className="modal-main">
                <form>


                    <button type="button" onClick={handleSubmit}>
                        Log in
                    </button>
                </form>
                <button type="button" onClick={handleClose}>
                    Continue as Guest
                </button>
            </section>
        </div>
    );
};

export default LogIn;