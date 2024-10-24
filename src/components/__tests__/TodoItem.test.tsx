import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';

describe('TodoItem component', () => {
  const mockToggleComplete = jest.fn();
  const mockRemoveTask = jest.fn();
  const defaultProps = {
    task: 'Тестовое задание',
    completed: false,
    toggleComplete: mockToggleComplete,
    removeTask: mockRemoveTask,
  };

  it('Тест отрисовывает задачу без зачеркивания, когда не выполнена', () => {
    render(<TodoItem {...defaultProps} />);
    expect(screen.getByText('Тестовое задание')).toHaveStyle('text-decoration: none');
  });

  it('Тест отрисовывает задачу с зачеркиванием, когда выполнена', () => {
    render(<TodoItem {...defaultProps} completed={true} />);
    expect(screen.getByText('Тестовое задание')).toHaveStyle('text-decoration: line-through');
  });

  it('Тест вызывает toggleComplete при нажатии на чекбокс', () => {
    render(<TodoItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggleComplete).toHaveBeenCalled();
  });

  it('Тест вызывает removeTask при нажатии на кнопку удаления', () => {
    render(<TodoItem {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /✘/ }));
    expect(mockRemoveTask).toHaveBeenCalled();
  });
  
});