import React from "react";
import {ListContext} from "./ListContext";
import {UserContext} from "../Users/UserContext";
//import {createSelector} from "reselect";
import {TaskItem} from "./TaskItem";

/**
* Creates and renders the frontend of list of tasks in a table
* */
export function TaskList (){
    const {taskList} =  React.useContext(ListContext);
    const {currentUser,currentToken} =  React.useContext(UserContext);
    const [filteredList, setFilteredList] = React.useState([])
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

   /* const selectTaskList = taskList => taskList;
    const selectNonArchived = createSelector(selectTaskList, testList =>
        testList.filter(item => !item.archived).sort(sortStyles
        ).map(
            (item, index) => (
                <TaskItem
                    key={item.uniqueId}
                    index={index}
                    task={item}
                />
            )))
    const selectNonComplete = createSelector(selectTaskList, (testList) =>
        testList.filter(item => !item.archived && item.isMarked===false).sort(
            sortStyles).map(
            (item, index) => (
                <TaskItem
                    key={item.uniqueId}
                    index={index}
                    task={item}
                />
            )))
    */

    /***
     * Sets the filtered list when conditions change
     * */
    const filterList = React.useCallback(  async ()=>{
        if(isHidden === true){
            if(currentUser === "Guest"){
                setFilteredList(taskList.testList)
            }else {
                await fetch('/todos/'+currentUser+'?filter=INCOMPLETE', {
                    method: 'GET',
                    headers: {
                        "Authorization" : currentToken,
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response =>
                    response.json()
                ).then(json =>{
                    setFilteredList(json.testList)
                })
            }

        }else {
            if(currentUser === "Guest"){
                setFilteredList(taskList.testList)
            }else {
                await fetch('/todos/'+currentUser, {
                    method: 'GET',
                    headers: {
                        "Authorization" : currentToken,
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response =>
                    response.json()
                ).then(json => {
                    setFilteredList(json.testList)
                })
            }
        }
    },[currentToken,currentUser,taskList,isHidden])

    React.useEffect(
            filterList
        , [isHidden,taskList,filterList]);

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
                    filteredList.filter(item => !item.archived).sort(
                        sortStyles).map(
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

