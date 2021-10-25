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

/**
 * Feeds the state of the list
 * */
let reducer = (currentList, newList ) => {
    if(newList === null){
        localStorage.removeItem("taskList");
        return testState;
    }
    return {...currentList, ...newList};
};


const ListContext = React.createContext(); // Creates the context of the list

const localState = JSON.parse(localStorage.getItem("taskList")); //reconverts the list back to the object


/**
 * Stores and manipulates the data of the list
 * */
function TaskListInfo (props){
    const [isHidden, setHidden] = React.useState(false)
    const [sortingStyle, setSortStyle] = React.useState("default")
    const [taskList, setTaskList] = React.useReducer(reducer,localState || testState );//In case it doesn't have local list it will provide a default one
    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));//Stores in cache the task list
        filterList(); //updates the visual part
    }, [taskList, isHidden, sortingStyle]);


    const [filteredList, setFilteredList] = React.useState(taskList.testList.filter(item => !item.archived).map(
        (item, index) => (
            <TaskItem
                key={item.uniqueId}
                index={index}
                task={item}
            />
        )))

    function filterList ()  {
        if(isHidden === true){
            setFilteredList( taskList.testList.filter(item => !item.archived && item.isMarked===false)
                .sort(
                (a,b)=>{
                    if(sortingStyle==="default"){
                        return   a.dateAdded > b.dateAdded ? 1 : -1
                    }else if (sortingStyle==="A-Z"){
                        return  a.taskString > b.taskString ? 1 : -1
                    }else if (sortingStyle==="Z-A"){
                        return  a.taskString < b.taskString ? 1 : -1
                    }
                    return 0;
                }
            ).map(
                (item, index) => (
                    <TaskItem
                        key={item.uniqueId}
                        index={index}
                        task={item}
                    />
                )))
        }else {
            setFilteredList(taskList.testList.filter(item => !item.archived)
                .sort(
                (a,b)=>{
                if(sortingStyle==="default"){
                    return   a.dateAdded > b.dateAdded ? 1 : -1
                }else if (sortingStyle==="A-Z"){
                    return  a.taskString > b.taskString ? 1 : -1
                }else if (sortingStyle==="Z-A"){
                    return  a.taskString < b.taskString ? 1 : -1
                }
                return 0;
            }).map(
                (item, index) => (
                    <TaskItem
                        key={item.uniqueId}
                        index={index}
                        task={item}
                    />
                )))
        }
    }
    /*
    *  Adds a new task to the list, visually in the bottom of the list
    *  */
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

    /*
    *  Finds and marks the task as complete
    *  */
    const setMarkedTask = (id, checked) => {
        const newList = {testList : taskList.testList.map(t => t.uniqueId === id ? {...t, isMarked: !t.isMarked, dateModified: Date.now()} : t)};
        setTaskList(newList);
    }

    /*
    *  Sets the new string of the edit form on the task
    *  */
    const setTask = (id, string) => {
        setTaskList({testList :taskList.testList.map(t => t.uniqueId === id ? {...t, taskString: string, dateModified: Date.now()} : t)});

    }

    /*
    *  Sets the task to archived to eventually delete it
    *  */
    const archiveTask = (id) => {
        setTaskList({testList :taskList.testList.map(t => t.uniqueId === id ? {...t, archived: true, dateModified: Date.now()} : t)});

    }
    /*
    * Deletes the task from the list
    * */
    const deleteTask = (id) => {
        setTaskList({testList :taskList.testList.filter(t => t.uniqueId !== id)});
    }



    return(
        <ListContext.Provider
            value={{taskList, setTaskList, setMarkedTask, addTask, setTask, archiveTask, deleteTask, filteredList, setFilteredList, isHidden, setHidden,sortingStyle, setSortStyle}}> {props.children}
        </ListContext.Provider>

    )
}


/*
* Creates and renders the task item that represents the task
* */
function TaskItem ({ task }) {
    const { setMarkedTask, setTask, archiveTask,deleteTask } = useContext(ListContext);

    const [isEditing, setIsEditing] = React.useState(false); //This is to check if the task is being edited, default is false because it must only be true if the user attempts to edit

    const [taskString, setTaskString] = React.useState(task.taskString);//This is to guide the string to be handled

    /*
    * Handles the event from submitting a new task string
    * */
    const handleNewTaskString = e => {
        e.preventDefault();
        if(taskString!==""){
            setIsEditing(false) //Once submitted it is presumed the user is also done editing the task
            setTask(task.uniqueId,taskString);
        };
    }

    return (
        <tr className="task-item" >

            <td>

                <input type="checkbox"
                       defaultChecked={task.isMarked}
                       value={task.isMarked}
                       onChange={e=> setMarkedTask(task.uniqueId, e.target.value)}
                />

            </td>
                <td>
                    <div className={ task.isMarked ? "marked" : ""} >
                    {
                        isEditing ?
                            <form onSubmit={handleNewTaskString}>
                                <input type="text" className="input" defaultValue={task.taskString} onChange={ e => setTaskString(e.target.value)}/>

                            </form>
                            : <div onDoubleClick ={()=> setIsEditing(true)}>{task.taskString}</div>
                    }
                    </div>
            </td>
            <td>
                <div>{new Date(task.dateAdded).toUTCString()}</div>
            </td>
            <td>
                <button onClick={()=> setIsEditing(true)}>
                    Edit task
                </button>
                <button onClick={ e => archiveTask(task.uniqueId)}>
                    Delete task
                </button>
            </td>

        </tr>
    )
}




/*
* Creates and renders the frontend of list of tasks in a table
* */
function TaskList ({}){
    const { filteredList, setFilteredList, isHidden, setHidden, sortingStyle, setSortStyle} = useContext(ListContext);

    /*
    * Handles the event for sorting
    * */
    const handleSort = e => {
        e.preventDefault();
        if(sortingStyle==="default"){
            setSortStyle("A-Z")
        }else if(sortingStyle==="A-Z"){
            setSortStyle("Z-A")
        }else if(sortingStyle==="Z-A"){
            setSortStyle("default")
        }
    }

    return(
        <table>
            <caption>Your Tasks</caption>
            <thead>
            <tr>
                <th>Done</th>
                <th onClick={handleSort}>Task </th>
                <th>Date Added</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody className="task-list">
                {
                    filteredList
                }
            </tbody>
            <label>
                Hide Completed
            </label>
            <input type="checkbox"
                   value={isHidden}
                   onChange={e=> setHidden(!isHidden)}
            />
        </table>


    )
}



export { TaskItem, ListContext, TaskListInfo, TaskList}
