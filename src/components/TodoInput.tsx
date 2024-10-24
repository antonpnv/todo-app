import React, { useState } from 'react';

interface TodoInputProps {
  addTask: (task: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ addTask }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        className="todo-input__input"
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
      />
    </form>
  );
};
