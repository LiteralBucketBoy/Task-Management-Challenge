import React, { Component } from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

const ListContext = React.createContext({TaskList})

function TaskItem ({ item }) {
        return (
            <li className="task-item" style={{ textDecoration : item.isMarked ? "marked" : ""} }>
                <div className="task-string">
                    {item.taskString}
                </div>
            </li>
        )
}

function TaskList (){
    const [tasks, setTasks] = React.useState([
        {
            index : 0,
            uniqueId : generateUniqueID,
            isMarked : true,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Add new task"
        },

        {
            index : 1,
            uniqueId : generateUniqueID,
            isMarked : false,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Edit task"
        },

        {
            index : 2,
            uniqueId : generateUniqueID,
            isMarked : false,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Complete task"
        }
    ]);
        return(
            <ul className="task-list">{tasks.map((item, index) => (
                <TaskItem
                key={index}
                index={index}
                item={item}
                />
                ))}</ul>
        )
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
                    <TaskList></TaskList>
                </div>
            </div>
        );
    }
}




export default SPA;