import React, { Component, useReducer } from "react";
import { Route, NavLink,HashRouter} from "react-router-dom";
import Homepage from "./Homepage";
import "./SPA.css";

class SPA extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/profile">profile</NavLink></li>
                        <li><NavLink to="/support">support</NavLink></li>
                    </ul>
                    <div className="content" id="main">
                        <Route exact path="/" component={Homepage}/>

                    </div>
                </div>
            </HashRouter>
        );
    }
}




export default SPA;