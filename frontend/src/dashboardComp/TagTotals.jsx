import { useState } from 'react';
import {
  activityIntervals,
  activeSeconds,
  formatDuration,
  toInputValue,
  startOfToday,
} from '../Timeutils';

function TagTotals({ tasks, tags, timestamps }) {
  const [from, setFrom] = useState(toInputValue(startOfToday()));
  const [to, setTo] = useState(null); // null means "until now"

  const now = new Date();
  const rangeStart = new Date(from);
  const rangeEnd = to === null ? now : new Date(to);
  const validRange = rangeStart < rangeEnd;

  function resetToToday() {
    setFrom(toInputValue(startOfToday()));
    setTo(null);
  }

  const secondsByTask = {};
  for (const task of tasks) {
    const stamps = timestamps.filter(s => Number(s.task) === task.id);
    secondsByTask[task.id] = activeSeconds(
      activityIntervals(stamps), rangeStart, rangeEnd, now
    );
  }

  const rows = tags
    .map(tag => {
      const seconds = tasks
        .filter(task => task.tags && task.tags.split(',').map(Number).includes(tag.id))
        .reduce((sum, task) => sum + secondsByTask[task.id], 0);
      return { id: tag.id, name: tag.name, seconds };
    })
    .filter(row => row.seconds > 0);

  return (
    <section>
      <h2>Total time per tag</h2>

      <label>
        Tag interval from{' '}
        <input
          type="datetime-local"
          step="1"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>
      <label>
        to{' '}
        <input
          type="datetime-local"
          step="1"
          value={to === null ? toInputValue(now) : to}
          onChange={(e) => setTo(e.target.value)}
        />
      </label>
      <button onClick={resetToToday}>Today</button>

      {!validRange ? (
        <p>Choose a start that is before the end.</p>
      ) : rows.length === 0 ? (
        <p>No tag was active in this interval.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tag</th>
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

export default TagTotals;