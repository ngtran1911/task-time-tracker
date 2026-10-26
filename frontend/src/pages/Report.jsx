import { useState, useEffect } from 'react';
import TaskTotals from '../reportComponent/TaskTotal';

function Report() {
  const [tasks, setTasks] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    async function load() {
      const tasksRes = await fetch('http://127.0.0.1:3010/tasks');
      setTasks(await tasksRes.json());
      const stampsRes = await fetch('http://127.0.0.1:3010/timestamps');
      setTimestamps(await stampsRes.json());
    }
    load();
  }, []);

  return (
    <div>
      <h1>Statistic</h1>
      <TaskTotals tasks={tasks} timestamps={timestamps} />
    </div>
  );
}

export default Report;