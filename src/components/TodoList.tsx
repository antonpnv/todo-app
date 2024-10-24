import { TodoItem } from './TodoItem';

interface TodoListProps {
  tasks: { id: number; task: string; completed: boolean }[];
  toggleComplete: (id: number) => void;
  removeTask: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ tasks, toggleComplete, removeTask }) => {
  return (
    <ul className="todo-list">
      {tasks.map((todo) => (
        <TodoItem
          key={todo.id}
          task={todo.task}
          completed={todo.completed}
          toggleComplete={() => toggleComplete(todo.id)}
          removeTask={() => removeTask(todo.id)}
        />
      ))}
    </ul>
  );
};
