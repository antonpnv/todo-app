import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoInput } from '../TodoInput';

describe('TodoInput component', () => {
  const addTaskMock = jest.fn();

  beforeEach(() => {
    addTaskMock.mockClear();
  });

  it('Тест проверяет, что компонент корректно отрисовывает поле ввода.', () => {
    render(<TodoInput addTask={addTaskMock} />);
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  it('Тест имитирует ввод текста в поле и проверяет его значения.', () => {
    render(<TodoInput addTask={addTaskMock} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Тестовое задание' } });
    expect(input).toHaveValue('Тестовое задание');
  });

  it('Тест проверяет, что addTask вызывается с правильным аргументом при отправке формы и поле ввода очищается после этого', () => {
    render(<TodoInput addTask={addTaskMock} />);
    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(input, { target: { value: 'Прекрасный код' } });
    fireEvent.submit(input);

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith('Прекрасный код');
    expect(input).toHaveValue('');
  });

  it('Тест проверяет, что addTask не вызывается, если поле пустое или содержит только пробелы', () => {
    render(<TodoInput addTask={addTaskMock} />);
    const input = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.submit(input);
    expect(addTaskMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input);
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
