function pad(n, size = 2) {
  return String(n).padStart(size, "0");
}
// Date -> "2026-10-24 16:30:00.000" (local time, same shape as the server's text)
export function formatTimestamp(date = new Date()) {
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `.${pad(date.getMilliseconds(), 3)}`
  );
}

// "2026-10-24 16:30:00.000" -> Date (read as local time; the reports will need this)
export function parseTimestamp(text) {
  return new Date(text.replace(" ", "T"));
}

// All timestamps of ONE task -> true if its latest one is a start
export function isActive(stamps) {
  if (stamps.length === 0) {
    return false;
  }
  const latest = stamps.reduce((a, b) => {
    if (b.timestamp > a.timestamp) return b;
    if (b.timestamp === a.timestamp && b.id > a.id) return b;
    return a;
  });
  return Number(latest.type) === 0;
}
export function activityIntervals(stamps) {
  const sorted = [...stamps].sort((a, b) =>
    a.timestamp < b.timestamp
      ? -1
      : a.timestamp > b.timestamp
        ? 1
        : a.id - b.id,
  );
  const intervals = [];
  let open = null;
  for (const s of sorted) {
    if (Number(s.type) === 0) {
      if (!open) open = parseTimestamp(s.timestamp);
    } else if (open) {
      intervals.push({ start: open, end: parseTimestamp(s.timestamp) });
      open = null;
    }
  }
  if (open) intervals.push({ start: open, end: null });
  return intervals;
}

export function activeSeconds(
  intervals,
  rangeStart,
  rangeEnd,
  now = new Date(),
) {
  let total = 0;
  for (const { start, end } of intervals) {
    const from = Math.max(start, rangeStart);
    const to = Math.min(end ?? now, rangeEnd, now);
    if (to > from) total += (to - from) / 1000;
  }
  return total;
}

export function formatDuration(totalSeconds) {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h} h ${m} min ${s % 60} s`;
}

export function toInputValue(date) {
  return formatTimestamp(date).slice(0, 19).replace(" ", "T");
}

export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
