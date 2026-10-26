import { useState } from 'react';
import { activityIntervals, activeSeconds, formatDuration, formatTimestamp,} from '../Timeutils';

// Date -> "2026-10-26T00:00:00", the text a datetime-local input wants
function toInputValue(date) {
  return formatTimestamp(date).slice(0, 19).replace(' ', 'T');
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function TaskTotals({ tasks, timestamps }) {
  const [from, setFrom] = useState(toInputValue(startOfToday()));
  const [to, setTo] = useState(toInputValue(new Date()));

  function resetToToday() {
    setFrom(toInputValue(startOfToday()));
    setTo(toInputValue(new Date()));
  }

  const rangeStart = new Date(from);
  const rangeEnd = new Date(to);
  const validRange = rangeStart < rangeEnd;

  const rows = tasks
    .map(task => {
      const stamps = timestamps.filter(s => Number(s.task) === task.id);
      const seconds = activeSeconds(activityIntervals(stamps), rangeStart, rangeEnd);
      return { id: task.id, name: task.name, seconds };
    })
    .filter(row => row.seconds > 0);

  return (
    <section>
      <h2>Task totals</h2>

      <label>
        From{' '}
        <input
          type="datetime-local"
          step="1"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>
      <label>
        To{' '}
        <input
          type="datetime-local"
          step="1"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </label>
      <button onClick={resetToToday}>Today</button>

      {!validRange ? (
        <p>Choose a start that is before the end.</p>
      ) : rows.length === 0 ? (
        <p>No task was active in this interval.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Active time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{formatDuration(row.seconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TaskTotals;