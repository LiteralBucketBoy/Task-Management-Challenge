import React from "react";
import {v4 as uuidv4} from "uuid";

/**Creates the context of the list*/
export const ListContext = React.createContext(undefined, undefined);

/**
 * Some default tasks
 */
export const testState = {
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
        ],
        User : "Guest"
    }
;

export const localUser = () => {
    let userInfo = JSON.parse(localStorage.getItem("currentUser"));
    return userInfo!==null ? userInfo : "Guest";
}

export function  localState (){
    let taskListInfo = JSON.parse(localStorage.getItem("taskList"+localUser()) ); /**reconverts the list back to the object*/
    return taskListInfo!==null ? taskListInfo : testState;
}
