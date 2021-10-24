import React, {Component, useContext, useEffect, useReducer} from "react";
import { createSelector } from 'reselect'
import { v4 as uuidv4 } from 'uuid';


/**
 * Some default tasks
 */
const testState = {
    testList: [
        {
            index : 0,
            uniqueId : "t-" + uuidv4(),
            isMarked : true,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Add new task"
        },

        {
            index : 1,
            uniqueId : "t-"+ uuidv4(),
            isMarked : false,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Edit task"
        },

        {
            index : 2,
            uniqueId : "t-" + uuidv4(),
            isMarked : false,
            dateAdded : Date.now(),
            dateModified : Date.now(),
            archived : false,
            taskString: "Complete task"
        }
    ]
}
;


let reducer = (currentList, newList) => {
    if(newList === null){
        localStorage.removeItem("taskList");
        return testState;
    }
    return {...currentList, ...newList};
};

const ListContext = React.createContext();

const localState = JSON.parse(localStorage.getItem("taskList"));

function TaskListInfo (props){
    const [taskList, setTaskList] = React.useReducer(reducer,localState || testState);
    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);

    const addTask = task => {
        setTaskList(
            taskList.testList.push(
                {
                    index : taskList.testList.length,
                    uniqueId : "t-" + uuidv4(),
                    isMarked : false,
                    dateAdded : Date.now(),
                    dateModified : Date.now(),
                    archived : false,
                    taskString: "" + task
                }
            )
        );
    }

    const setMarkedTask = (id, checked) => {
        const newList = {testList : taskList.testList.map(t => t.uniqueId === id ? {...t, isMarked: !t.isMarked} : t)};
        setTaskList(newList);
    }
    const setTask = (id, string) => {
        setTaskList({testList :taskList.testList.map(t => t.uniqueId === id ? {...t, taskString: string} : t)});
    }
    return(
        <ListContext.Provider
            value={{taskList, setTaskList, setMarkedTask, addTask, setTask}}> {props.children}
        </ListContext.Provider>

    )
}

/* Selectors
*
*
*/
export const selectTasks = createSelector(localState);


function TaskItem ({ task }) {
    const { setMarkedTask, setTask } = useContext(ListContext);
    const [isEditing, setIsEditing] = React.useState(false);
    const [taskString, setTaskString] = React.useState(task.taskString);
    const handleNewTaskString = e => {
        e.preventDefault();
        if(taskString!==""){
            setTask(task.uniqueId,taskString);
        };
    }

    return (
        <li className="task-item" >

            <div className={ task.isMarked ? "marked" : ""} >
                <input type="checkbox"
                       defaultChecked={task.isMarked}
                       value={task.isMarked}
                       onChange={e=> setMarkedTask(task.uniqueId, e.target.value)}
                />
                {
                    isEditing ?
                        <form onSubmit={handleNewTaskString}>
                            <input type="text"  value={taskString} onChange={()=> e => setTaskString(e.target.value)}/>
                            <button onClick={ e => setTask(task.uniqueId,taskString)}>
                                edit task
                            </button>
                        </form>
                        : <div onDoubleClick ={()=> setIsEditing(true)}>{task.taskString}</div>
                }
            </div>
        </li>
    )
}




function TaskList ({}){
    const { taskList, setTaskList} = useContext(ListContext);

    return(
        <ul className="task-list">{taskList.testList.map((item, index) => (
            <TaskItem
                key={index}
                index={index}
                task={item}
            />
        ))}</ul>
    )
}



export { TaskItem, ListContext, TaskListInfo, TaskList}
