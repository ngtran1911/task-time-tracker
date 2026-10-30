import { useState } from "react";
import {
  activityIntervals,
  activeSeconds,
  formatDuration,
  formatTimestamp,
} from "../Timeutils";

// Date -> "2026-10-26", the text a date input wants (local time)
function toDateValue(date) {
  return formatTimestamp(date).slice(0, 10);
}

// "2026-10-26" -> Date at local midnight
function parseDay(text) {
  const [y, m, d] = text.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function daysAgo(n) {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate() - n);
}

function DailyChart({ tasks, timestamps }) {
  const [taskId, setTaskId] = useState("");
  const [fromDay, setFromDay] = useState(toDateValue(daysAgo(6)));
  const [toDay, setToDay] = useState(toDateValue(new Date()));

  function resetToLastWeek() {
    setFromDay(toDateValue(daysAgo(6)));
    setToDay(toDateValue(new Date()));
  }

  const validRange =
    fromDay !== "" && toDay !== "" && parseDay(fromDay) <= parseDay(toDay);
  const task = tasks.find((t) => String(t.id) === taskId);

  const rows = [];
  if (task && validRange) {
    const now = new Date();
    const intervals = activityIntervals(
      timestamps.filter((s) => Number(s.task) === task.id),
    );
    const last = parseDay(toDay);
    for (
      let day = parseDay(fromDay);
      day <= last;
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    ) {
      const next = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() + 1,
      );
      rows.push({
        key: toDateValue(day),
        label: day.toLocaleDateString("fi-FI"),
        seconds: activeSeconds(intervals, day, next, now),
      });
    }
  }
  const max = Math.max(0, ...rows.map((r) => r.seconds));

  return (
    <section className="panel">
      <h2>Daily activity</h2>

      <label>
        Task{" "}
        <select value={taskId} onChange={(e) => setTaskId(e.target.value)}>
          <option value="">Choose a task</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        From day{" "}
        <input
          type="date"
          value={fromDay}
          onChange={(e) => setFromDay(e.target.value)}
        />
      </label>
      <label>
        To day{" "}
        <input
          type="date"
          value={toDay}
          onChange={(e) => setToDay(e.target.value)}
        />
      </label>
      <button onClick={resetToLastWeek}>Last 7 days</button>

      {!task ? (
        <p>Choose a task to see its daily active time.</p>
      ) : !validRange ? (
        <p>Choose a first day that is not after the last day.</p>
      ) : (
        <>
          <p>Active time per day: {task.name}</p>
          <ul className="chart">
            {rows.map((row) => (
              <li key={row.key} className="chart-row">
                <span className="chart-label">{row.label}</span>
                <span className="chart-track" aria-hidden="true">
                  <span
                    className="chart-bar"
                    style={{
                      width: max > 0 ? `${(row.seconds / max) * 100}%` : "0%",
                    }}
                  />
                </span>
                <span className="chart-value">
                  {formatDuration(row.seconds)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default DailyChart;
