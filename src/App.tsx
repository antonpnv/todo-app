import React, { useState, useEffect } from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import './App.css';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = (task: string) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const removeTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1 className='title'>todos</h1>
      <TodoInput addTask={addTask} />
      <TodoList tasks={filteredTodos} toggleComplete={toggleComplete} removeTask={removeTask} />
      <div className="todo-btns">
        <span className="todo-count">{todos.filter((todo) => !todo.completed).length} items left</span>
        <button className="button" onClick={() => setFilter('all')}>All</button>
        <button className="button" onClick={() => setFilter('active')}>Active</button>
        <button className="button" onClick={() => setFilter('completed')}>Completed</button>
        <button className="button" onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
};

export default App;
