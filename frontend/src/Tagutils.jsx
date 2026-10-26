export function addTagId(tagsText, id) {
  const ids = tagsText.split(',').filter(x => x !== '');
  if (!ids.includes(String(id))) {
    ids.push(String(id));
  }
  return ids.join(',');
}

export function removeTagId(tagsText, id) {
  return tagsText
    .split(',')
    .filter(x => x !== '' && x !== String(id))
    .join(',');
}

export function toInputValue(date) {
  return formatTimestamp(date).slice(0, 19).replace(' ', 'T');
}

export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
