interface TodoItemProps {
  task: string;
  completed: boolean;
  toggleComplete: () => void;
  removeTask: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, completed, toggleComplete, removeTask }) => {
  return (
    <li className="todo-item">
      <input type="checkbox" className="todo-item__checkbox" checked={completed} onChange={toggleComplete} />
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
          opacity: completed ? 0.4 : 1,
        }}
      >
        {task}
      </span>
      <button className="todo-item__remove-button" onClick={removeTask}>&#10008;</button>
    </li>
  );
};


