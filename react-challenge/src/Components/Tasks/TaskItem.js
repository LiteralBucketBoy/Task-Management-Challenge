
import React from "react";
import {ListContext} from "./ListContext";

/**
 * Creates and renders the task item that represents the task
 * */
export function TaskItem ({ task }) {
    const {setMarkedTask, setTask, deleteTask} =  React.useContext(ListContext);

    const [isEditing, setIsEditing] = React.useState(false); /**This is to check if the task is being edited, default is false because it must only be true if the user attempts to edit*/

    const [taskString, setTaskString] = React.useState(task.taskString);/**This is to guide the string to be handled*/

    /**
     * Handles the event from submitting a new task string
     * */
    const handleNewTaskString = e => {
        e.preventDefault();
        if(taskString!==""){
            setIsEditing(false) /**Once submitted it is presumed the user is also done editing the task*/
            setTask(task.uniqueId,taskString);
        }
    }

    return (
        <tr className="task-item" >

            <td>

                <input type="checkbox"
                       defaultChecked={task.isMarked}
                       value={task.isMarked}
                       onChange={async e=> {setMarkedTask(task.uniqueId, e.target.value);  setIsEditing(false);}}
                />

            </td>
            <td>
                <div className={ task.isMarked ? "marked" : ""} >
                    {
                        isEditing ?
                            <form onSubmit={handleNewTaskString}>
                                <input type="text" className="input" defaultValue={task.taskString} onChange={ e => setTaskString(e.target.value)}/>

                            </form>
                            : <div onDoubleClick ={ ()=> task.isMarked ? null : setIsEditing(true)}>{task.taskString}</div>
                    }
                </div>
            </td>
            <td>
                <div>{new Date(task.dateAdded).toUTCString()}</div>
            </td>
            <td>
                <button className={ task.isMarked ? "editBtn-m" : "editBtn"} disabled={task.isMarked} onClick={()=> setIsEditing(true)}>
                    Edit task
                </button>
                <button className="deleteBtn" onClick={ () => deleteTask(task.uniqueId)}>
                    Delete task
                </button>
            </td>

        </tr>
    )
}

