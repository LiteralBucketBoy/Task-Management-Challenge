import React, { useContext } from "react";
import {ListContext, TaskList} from "./TaskList";



function TaskForm({addTask}){
    const [task, setTask] = React.useState("");
    const handleNewTask = e => {
        e.preventDefault();
        if(task!==""){
            //TODO Check if repeated

            addTask(task);
            setTask("");

        }
    }
    return (
        <form className="addTask" onSubmit={handleNewTask}>
            <input
                type="text"
                className="input"
                value={task}
                placeholder="Write a new task here...."
                onChange={e => setTask(e.target.value)}
                required
            />
            <button className="addBtn" onClick={()=> e => setTask(e.target.value)}>
            Add task
            </button>
        </form>

    );

}


const Homepage = () => {
    const {  addTask} = useContext(ListContext);



    return (
        <React.Fragment >
            <section className="content">
            <h1 className="content-items">New Task</h1>
            <TaskForm className="content-items" addTask={addTask}>  </TaskForm>
            <h1 className="content-items">Tasks</h1>

            <TaskList className="content-items" />


            </section>
        </React.Fragment>
    );
};



export default Homepage;
