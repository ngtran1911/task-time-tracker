import { useState } from "react";

function Task({
  name,
  taskTags,
  allTags,
  active,
  onToggle,
  onDelete,
  onAddTag,
  onRemoveTag,
  onRename,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const missingTags = allTags.filter(
    (tag) => !taskTags.some((t) => t.id === tag.id),
  );

  function startEdit() {
    setDraft(name);
    setEditing(true);
  }

  function save(e) {
    e.preventDefault();
    const newName = draft.trim();
    if (newName && newName !== name) {
      onRename(newName);
    }
    setEditing(false);
  }

  async function handleToggle() {
    setBusy(true);
    try {
      await onToggle();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="task">
      {editing ? (
        <form onSubmit={save}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Task name"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>{name}</h3>
          <button onClick={startEdit} aria-label={`Rename ${name}`}>
            Rename
          </button>
        </>
      )}

      <p className={active ? "status status-on" : "status status-off"}>
        {active ? "Active" : "Inactive"}
      </p>

      <button
        className={active ? "btn-stop" : ""}
        onClick={handleToggle}
        disabled={busy}
        aria-label={`${active ? "Stop" : "Start"} ${name}`}
      >
        {active ? "Stop" : "Start"}
      </button>

      <div className="tags">
        {taskTags.map((tag) => (
          <span key={tag.id} className="tag">
            {tag.name}
            <button
              onClick={() => onRemoveTag(tag.id)}
              aria-label={`Remove tag ${tag.name} from ${name}`}
            >
              x
            </button>
          </span>
        ))}
      </div>

      {missingTags.length > 0 && (
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              onAddTag(Number(e.target.value));
            }
          }}
          aria-label={`Add tag to ${name}`}
        >
          <option value="">Add tag...</option>
          {missingTags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      )}

      <button onClick={onDelete} aria-label={`Remove ${name}`}>
        Remove
      </button>
    </div>
  );
}

export default Task;
