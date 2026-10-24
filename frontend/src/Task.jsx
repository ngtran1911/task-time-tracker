function Task({ name, taskTags, allTags, onDelete, onAddTag, onRemoveTag }) {
  const missingTags = allTags.filter(
    tag => !taskTags.some(t => t.id === tag.id)
  );

  return (
    <div className="task">
      <h3>{name}</h3>

      <div className="tags">
        {taskTags.map(tag => (
          <span key={tag.id} className="tag">
            {tag.name}
            <button
              onClick={() => onRemoveTag(tag.id)}
              aria-label={`Remove tag ${tag.name} from ${name}`}
            > X </button>
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
        >
          <option value="">Add tag...</option>
          {missingTags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      )}

      <button onClick={onDelete}>Remove</button>
    </div>
  );
}

export default Task;