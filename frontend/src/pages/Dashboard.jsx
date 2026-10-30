import { useState, useEffect } from "react";
import Task from "../Task";
import TaskForm from "../dashboardComp/TaskForm";
import TagForm from "../dashboardComp/TagForm";
import { addTagId, removeTagId } from "../Tagutils";
import { isActive, formatTimestamp } from "../Timeutils";

function Dashboard({ alternative }) {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  async function displayTasks() {
    const res = await fetch("http://127.0.0.1:3010/tasks");
    setTasks(await res.json());
  }
  async function displayTags() {
    const response = await fetch("http://127.0.0.1:3010/tags");
    setTags(await response.json());
  }

  useEffect(() => {
    displayTasks();
    displayTags();
    displayTimestamp();
  }, []);

  function getTaskTag(task) {
    if (!task.tags) {
      return [];
    }
    return task.tags
      .split(",")
      .map((id) => tags.find((tag) => tag.id === Number(id)))
      .filter((tag) => tag);
  }

  async function deleteTask(id) {
    const res = await fetch(`http://127.0.0.1:3010/timesfortask/${id}`);
    const stamps = await res.json();
    for (const stamp of stamps) {
      await fetch(`http://127.0.0.1:3010/timestamps/${stamp.id}`, {
        method: "DELETE",
      });
    }
    await fetch(`http://127.0.0.1:3010/tasks/${id}`, { method: "DELETE" });
    await displayTasks();
    await displayTimestamp();
  }

  async function addTask(name) {
    await fetch("http://127.0.0.1:3010/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, tags: "", additional_data: "" }),
    });
    await displayTasks();
  }

  async function addTag(name) {
    const exists = tags.some(
      (tag) => tag.name.toLowerCase() === name.toLowerCase(),
    );
    if (exists) {
      return;
    }
    await fetch("http://127.0.0.1:3010/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, additional_data: "" }),
    });
    await displayTags();
  }

  async function updateTaskTags(task, newTagsText) {
    await fetch(`http://127.0.0.1:3010/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags: newTagsText }),
    });
    await displayTasks();
  }

  function addTagtoTask(task, tagId) {
    return updateTaskTags(task, addTagId(task.tags, tagId));
  }

  function removeTagFromTask(task, tagId) {
    return updateTaskTags(task, removeTagId(task.tags, tagId));
  }

  async function renameTask(task, newName) {
    await fetch(`http://127.0.0.1:3010/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    await displayTasks();
  }

  async function displayTimestamp() {
    const response = await fetch("http://127.0.0.1:3010/timestamps");
    setTimestamps(await response.json());
  }

  function taskIsActive(task) {
    return isActive(timestamps.filter((s) => Number(s.task) === task.id));
  }

  async function addTimestamp(taskId, type, time) {
    await fetch("http://127.0.0.1:3010/timestamps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: time, task: taskId, type }),
    });
  }

  async function toggleTask(task) {
    const time = formatTimestamp();
    const starting = !taskIsActive(task);

    if (starting && alternative) {
      const others = tasks.filter((t) => t.id !== task.id && taskIsActive(t));
      for (const other of others) {
        await addTimestamp(other.id, 1, time);
      }
    }

    await addTimestamp(task.id, starting ? 0 : 1, time);
    await displayTimestamp();
  }
  return (
    <div>
      <header>
        <h1>DASHBOARD PAGE</h1>
        <p className="task-count">total task : {tasks.length}</p>
        <TaskForm addTask={addTask} />
        <TagForm addTag={addTag} />
      </header>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            name={task.name}
            taskTags={getTaskTag(task)}
            allTags={tags}
            onDelete={() => deleteTask(task.id)}
            onRename={(newName) => renameTask(task, newName)}
            onAddTag={(tagId) => addTagtoTask(task, tagId)}
            onRemoveTag={(tagId) => removeTagFromTask(task, tagId)}
            active={taskIsActive(task)}
            onToggle={() => toggleTask(task)}
          />
        ))}
      </div>
    </div>
  );
}
export default Dashboard;
