import React, { Component } from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";



class TaskItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uniqueId : generateUniqueID,
            stringValue : "",
            isMarked : false,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false
        };

    }


    render() {
        return (
            <li className="task-item ">
                <div className={TaskItem}>
                    {this.state.stringValue}
                </div>
            </li>
        )
    }
}

class TaskList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        }
        this.addNewItem = this.addNewItem.bind(this);
    }

    addNewItem(task){
        this.state.taskList.push(task);
    }

    render(){
        return(
            <ul className="task-list">{this.state.taskList}</ul>
        )
    }
}

class SPA extends Component {
    render() {
        return (
            <div>
                <h1>Simple SPA</h1>
                <ul className="header">
                    <li><a href="/">Home</a></li>
                    <li><a href="/profile">profile</a></li>
                    <li><a href="/support">support</a></li>
                </ul>
                <div className="content">
                    {testList}
                </div>
            </div>
        );
    }
}

//Some testing data
let testList = <TaskList></TaskList>


export default SPA;