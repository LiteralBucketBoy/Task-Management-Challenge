import React from "react";
import {ListContext} from "./ListContext";
import {UserContext} from "../Users/UserContext";
import {TaskItem} from "./TaskItem";
import {createSelector} from "reselect";

/**
* Creates and renders the frontend of list of tasks in a table
* */
export function TaskList (){
    const {taskList} =  React.useContext(ListContext);
    const {currentUser} =  React.useContext(UserContext);

    const [sortingStyle, setSortStyle] = React.useState("default")
    const [isHidden, setHidden] = React.useState(false);
    /***
     * Switches the sorting style accordingly
     */
    const sortStyles = (a,b)=>{
        if(sortingStyle==="default"){
            return   a.dateAdded > b.dateAdded ? 1 : -1
        }else if (sortingStyle==="A-Z"){
            return  a.taskString > b.taskString ? 1 : -1
        }else if (sortingStyle==="Z-A"){
            return  a.taskString < b.taskString ? 1 : -1
        }
        return 0;}


    const selectByComplete = createSelector([taskList => taskList.testList,(taskList,isHidden) => isHidden], (testList) =>
        testList.filter(item => isHidden ? item.isMarked===false : true).sort(sortStyles))

    const [filteredList, setFilteredList] = React.useState(selectByComplete(taskList))

    React.useEffect(()=> setFilteredList(selectByComplete(taskList)), [currentUser,isHidden, taskList, sortingStyle])


    /**
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
        <><table>
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
                    filteredList.map(
                        (item, index) => (
                            <TaskItem
                                key={item.uniqueId}
                                index={index}
                                task={item}
                            />
                        ))
                }
            </tbody>

        </table>
            <label>
            Hide Completed
            </label>
            <input type="checkbox"
                   value={isHidden}
                   onChange={()=> setHidden(!isHidden)}
            />
        </>
    )
}

