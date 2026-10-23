import { useState, useEffect } from 'react';
import Task from '../Task';
import TaskForm from '../dashboardComp/TaskForm';
import TagForm from '../dashboardComp/TagForm'

function Dashboard() {
  const[tasks, setTasks] = useState([]);
  const[tags, setTags] = useState([]);
  
  async function displayTasks() {
    const res = await fetch('http://127.0.0.1:3010/tasks')
    setTasks(await res.json());
  }
  async function displayTags() {
    const response = await fetch('http://127.0.0.1:3010/tags')
    setTags(await response.json());
  }
  
  useEffect(() => {
    displayTasks();
    displayTags();
  }, []);

  function getTagName(task){
    if(!task.tags){
      return [];
    }
    return task.tags
    .split(',')
    .map(id => tags.find(tag => tag.id === Number(id)))
    .filter(tag => tag)
    .map(tag => tag.name);

  }

  async function deleteTask(id){
    await fetch (`http://127.0.0.1:3010/tasks/${id}`, {method : 'DELETE'});
    await displayTasks();
  }
  
  async function addTask(name){
    await fetch ('http://127.0.0.1:3010/tasks', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name:name, tags: '', additional_data: '' }),
    })
    await displayTasks();
  }

  async function addTag(name) {
  const exists = tags.some(tag => tag.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    return;
  }
  await fetch('http://127.0.0.1:3010/tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, additional_data: '' }),
  });
  await displayTags();
}


  return(
    <div>
      <header>
        <h1>DASHBOARD PAGE</h1>
        <p>total task : {tasks.length}</p>
        <TaskForm addTask = {addTask}></TaskForm>
        <TagForm addTag = {addTag}></TagForm>
        <p>Tags: {tags.map(tag => tag.name).join(', ')}</p>
      </header>
     
      {tasks.map(task => (
      <Task 
      key={task.id} 
      name={task.name} 
      tagNames={getTagName(task)}
      onDelete={() => deleteTask(task.id)} /> 
      ))}

    </div>
  )
}
export default Dashboard;