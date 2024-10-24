import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
});

describe('App', () => {
  it('Тест рендерит заголовок и компоненты ввода задач', () => {
    render(<App />);
    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('Тест добавляет новую задачу', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Покрытие тестами' } });
    fireEvent.submit(input);

    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument();
  });

  it('Тест переключает состояние выполнения задачи', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Прекрасный код' } });
    fireEvent.submit(input);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('Тест удаляет задачу', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Тестовое задание' } });
    fireEvent.submit(input);

    const removeButton = screen.getByText(/✘/);
    fireEvent.click(removeButton);
    expect(screen.queryByText('Тестовое задание')).not.toBeInTheDocument();
  });

  it('Тест фильтрует задачи по статусу: All, Active и Completed', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText('Active'));
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });

  it('Тест очищает завершённые задачи по нажатию на "Clear completed"', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Закончить тесты' } });
    fireEvent.submit(input);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText('Clear completed'));
    expect(screen.queryByText('Закончить тесты')).not.toBeInTheDocument();
  });

  it('Тест удаляет задачу корректно', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Удалить задачу' } });
    fireEvent.submit(input);

    const removeButton = screen.getByText(/✘/);
    fireEvent.click(removeButton);

    expect(screen.queryByText('Удалить задачу')).not.toBeInTheDocument();
  });
});
