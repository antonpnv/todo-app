import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../TodoList';

describe('TodoList component', () => {
  const mockToggleComplete = jest.fn();
  const mockRemoveTask = jest.fn();
  const tasks = [
    { id: 1, task: 'Тестовое задание', completed: false },
    { id: 2, task: 'Прекрасный код', completed: true },
  ];

  it('Тест отрисовывает все задачи', () => {
    render(<TodoList tasks={tasks} toggleComplete={mockToggleComplete} removeTask={mockRemoveTask} />);
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument();
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument();
  });

  it('Тест вызывает toggleComplete при нажатии на чекбокс', () => {
    render(<TodoList tasks={tasks} toggleComplete={mockToggleComplete} removeTask={mockRemoveTask} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  it('Тест вызывает removeTask при нажатии на кнопку удаления', () => {
    render(<TodoList tasks={tasks} toggleComplete={mockToggleComplete} removeTask={mockRemoveTask} />);
    
    const removeButtons = screen.getAllByRole('button', { name: /✘/ });
    fireEvent.click(removeButtons[0]);
    
    expect(mockRemoveTask).toHaveBeenCalledWith(1);
  });
});