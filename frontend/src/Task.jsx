function Task({name, tagNames, onDelete}) {
    return( 
        <div className="task">
            <h3>{name}</h3>
            <div className="tags">{tagNames.join(',')}</div>
            <button onClick={onDelete}>Remove</button>
        </div>
    )
}
export default Task;