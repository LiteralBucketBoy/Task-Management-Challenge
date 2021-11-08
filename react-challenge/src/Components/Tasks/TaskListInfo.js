import {v4 as uuidv4} from "uuid";
import {UserContext} from "../Users/UserContext";
import {ListContext, localState, localUser} from "./ListContext";
import React from "react";

/**
 * Feeds the state of the list
 * */
let reducer = (currentList, newList ) => {
    if(newList === null){
        localStorage.removeItem("taskList");
        return localState();
    }
    return {...currentList, ...newList};
};


/**
 * Stores and manipulates the data of the list
 * */
export function TaskListInfo (props){
    const [taskList, setTaskList] = React.useReducer(reducer, localState(), undefined);/**In case it doesn't have local list it will provide a default one*/
    const { currentUser, currentToken} = React.useContext(UserContext);

    React.useEffect(() => {
        if(currentUser !== null && currentUser !=="Guest"){
            setTaskList( JSON.parse(localStorage.getItem("taskList"+currentUser.name) ));
        }
    }, [currentUser]);

    React.useEffect(() => {
        localStorage.setItem(("taskList" + localUser()), JSON.stringify(taskList));/**Stores in cache the task list*/
    }, [currentUser,taskList]);


    /**
     *  Adds a new task to the list, visually in the bottom of the list
     *  */
    async function addTask(task) {
        if(currentUser === "Guest"){
            setTaskList(
                taskList.testList.push(
                    {
                        index : taskList.testList.length,
                        uniqueId : "t-" + uuidv4(),
                        isMarked : false,
                        dateAdded : Date.now(),
                        dateModified : Date.now(),
                        archived : false,
                        taskString: task
                    }
                )
            );
        }else {
            await fetch('/todos/'+currentUser, {
                method: 'PUT',
                body: JSON.stringify({
                    index: taskList.testList.length,
                    description: "" + task
                }),
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response =>
                response.json()
            ).then(json => {
                setTaskList(
                    taskList.testList.push(
                        json
                    )
                );
            }).catch(e => console.log(e))
        }

    }

    /**
     *  Finds and marks the task as complete
     *  */
    async function setMarkedTask(id, value) {
        if(currentUser === "Guest"){
            setTaskList({
                testList: taskList.testList.map(t => t.uniqueId === id ? {
                    ...t,
                    isMarked: !t.isMarked,
                    dateModified: Date.now()
                } : t)
            });
        }else {
            await fetch('/todo/' + id, {
                method: 'PATCH',
                body: JSON.stringify({
                    isMarked: value,
                }),
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response =>
                response.json()
            ).then(json => {
                setTaskList({
                    testList: taskList.testList.map(t => t.uniqueId === id ? {
                        ...t,
                        isMarked: json.isMarked,
                        dateModified: Date.now()
                    } : t)
                });

            }).catch(err => console.log(err))
        }
    }

    /**
     *  Sets the new string of the edit form on the task
     *  */
    async function setTask(id, string) {
        if(currentUser === "Guest"){
            setTaskList({
                testList: taskList.testList.map(t => t.uniqueId === id ? {
                    ...t,
                    taskString: string,
                    dateModified: Date.now()
                } : t)
            });
        }else {
            await fetch('/todo/' + id, {
                method: 'PATCH',
                body: JSON.stringify({
                    description: string,
                }),
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response =>
                response.json()
            ).then(json => {
                setTaskList({
                    testList: taskList.testList.map(t => t.uniqueId === id ? {
                        ...t,
                        taskString: json.description,
                        dateModified: Date.now()
                    } : t)
                });
            })
        }

    }

    /**
     *  Sets the task to archived to eventually delete it
     *  */
    const archiveTask = (id) => {
        setTaskList({testList :taskList.testList.map(t => t.uniqueId === id ? {...t, archived: true, dateModified: Date.now()} : t)});

    }
    /**
     * Deletes the task from the list
     * */
    async function deleteTask(id){
        if(currentUser === "Guest"){
            setTaskList({testList: taskList.testList.filter(t => t.uniqueId !== id)});
        }else {
            await fetch('/todo/' + id, {
                method: 'DELETE',
                headers: {
                    "Authorization" : currentToken,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(() =>
                setTaskList({testList: taskList.testList.filter(t => t.uniqueId !== id)})
            )
        }
    }

    return(
        <ListContext.Provider
            value={{taskList, setTaskList, addTask, setMarkedTask, setTask, archiveTask, deleteTask}}> {props.children}
        </ListContext.Provider>

    )
}