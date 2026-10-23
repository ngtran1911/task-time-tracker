import { useState } from "react";

function TaskForm({addTask}){
    const [name, setName] = useState('');
    
    
    function handleSubmit(e) {
        e.preventDefault();
        if(!name.trim()){
            return;
        }
        addTask(name.trim())

        //reset state
        setName('')
    

    }
    return(
        //ADD TASKAND SAVE 
        <form onSubmit={handleSubmit} className="task-form">
            <div id="input">
                <input 
                type="text" 
                value={name} 
                placeholder="what are you working on " 
                onChange={(e)=>setName(e.target.value)}/>

                <span><button type="submit">ADD TASK</button></span>
            </div>
        </form>
    )
}
export default TaskForm;