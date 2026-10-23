function TaskList({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index}>
          <div>
            <span>{task.text}</span>
            <small>{task.priority}</small>
          </div>
          <div>
            <button onClick={() => deleteTask(index)}>DELETE</button>
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "UNDO" : "COMPLETE"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;