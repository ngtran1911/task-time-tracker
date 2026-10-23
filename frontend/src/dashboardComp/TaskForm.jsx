import { useState } from "react";

function TaskForm({addTask}){
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({text:task, priority, completed: false})

        //reset state
        setTask('')
        setPriority('Medium')

    }
    return(
        //ADD TASKAND SAVE 
        <form onSubmit={handleSubmit} className="task-form">
            <div id="input">
                <input type="text" value={task} 
                placeholder="what are you working on " 
                onChange={(e)=>setTask(e.target.value)}/>
                <span><button type="submit">ADD TASK</button></span>
                
            </div>
            <div >
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

            </div>
            
        </form>
    )
}
export default TaskForm;