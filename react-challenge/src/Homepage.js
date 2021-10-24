import React, { useContext } from "react";
import {ListContext, TaskList} from "./TaskList";
import {v4 as uuidv4} from "uuid";



function TaskForm({addTask}){
    const [task, setTask] = React.useState("");
    const handleNewTask = e => {
        e.preventDefault();
        if(task!==""){
            //TODO Check if repeated

            addTask(task);
            setTask("");

        };
    }
    return (
        <form onSubmit={handleNewTask}>
            <input
                type="text"
                className="input"
                value={task}
                placeholder="Write a new task here...."
                onChange={e => setTask(e.target.value)}
                required
            />
            <button onClick={()=> e => setTask(e.target.value)}>
            add task
            </button>
        </form>

    );

}


const Homepage = () => {
    const { taskList, setTaskList, addTask, setMarkedTask} = useContext(ListContext);


    return (
        <React.Fragment >
            <h1>New Task</h1>
            <TaskForm addTask={addTask}>  </TaskForm>
            <h1>Tasks</h1>

            <TaskList />

            <button onClick={() =>  {setTaskList(null) ;window.location.reload();}}>
                Reset Cache
            </button>
        </React.Fragment>
    );
};



export default Homepage;
