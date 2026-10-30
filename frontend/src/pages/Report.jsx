import { useState, useEffect } from 'react';
import TaskTotals from '../reportComponent/TaskTotal';
import TagTotals from '../dashboardComp/TagTotals';
import DailyChart from '../reportComponent/DailyChart';

function Report() {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    async function load() {
      const tasksRes = await fetch('http://127.0.0.1:3010/tasks');
      setTasks(await tasksRes.json());
      const tagsRes = await fetch('http://127.0.0.1:3010/tags');
      setTags(await tagsRes.json());
      const stampsRes = await fetch('http://127.0.0.1:3010/timestamps');
      setTimestamps(await stampsRes.json());
    }
    load();
  }, []);

  return (
    <div>
      <h1>Statistic</h1>
      <TaskTotals tasks={tasks} tags={tags} timestamps={timestamps} />
      <TagTotals tasks={tasks} tags={tags} timestamps={timestamps} />
      <DailyChart tasks={tasks} timestamps={timestamps}></DailyChart>
    </div>
  );
}

export default Report;