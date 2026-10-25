function pad(n, size = 2) {
  return String(n).padStart(size, '0');
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
  return new Date(text.replace(' ', 'T'));
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
