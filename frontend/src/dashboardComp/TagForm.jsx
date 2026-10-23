import { useState } from "react";

function TagForm({addTag}){
    const [name, setName] = useState('');
    
    
    function handleSubmit(e) {
        e.preventDefault();
        if(!name.trim()){
            return;
        }
        addTag(name.trim())

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
                placeholder="New tag " 
                onChange={(e)=>setName(e.target.value)}/>

                <span><button type="submit">ADD TAG</button></span>
            </div>
        </form>
    )
}
export default TagForm;