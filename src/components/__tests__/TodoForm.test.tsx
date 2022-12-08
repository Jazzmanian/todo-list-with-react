import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { postTasks } from '../../api';

jest.mock('../../api/index');

describe('TodoForm', () => {
  const mockTasks: any = {
    name: 'task name',
    completed: true,
  };

  it('should show input', () => {
    render(<TodoForm addTodo={mockTasks} />);
    expect(screen.getByLabelText('todo-input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your todo item')
    ).toBeInTheDocument();
  });
  it('should show button', () => {
    render(<TodoForm addTodo={mockTasks} />);
    expect(screen.getByText(/add items/i)).toBeInTheDocument();
  });

  it('should clear input when click the button', () => {
    (postTasks as jest.Mock).mockResolvedValue(mockTasks);
    const input = render(<TodoForm addTodo={mockTasks} />).getByLabelText(
      'todo-input'
    );
    userEvent.type(input, 'abc');
    fireEvent.click(screen.getByText(/add items/i));
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('should handle onChange', () => {
    const utils = render(<TodoForm addTodo={mockTasks} />);
    const input = utils.getByLabelText('todo-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect((input as HTMLInputElement).value).toBe('abc');
  });

  it('should not add task when input spaces', () => {
    const input = render(<TodoForm addTodo={mockTasks} />).getByLabelText(
      'todo-input'
    );
    const text = '      ';
    userEvent.type(input, text);
    fireEvent.click(screen.getByText(/add items/i));
    expect(screen.queryByDisplayValue(text)).not.toBeInTheDocument();
  });

  it('should execute a callback function with the input value as an argument when the buttion is pressed', () => {
    (postTasks as jest.Mock).mockImplementation(
      async () => await Promise.resolve(mockTasks.name)
    );
    render(<TodoForm addTodo={mockTasks} />);
    userEvent.type(screen.getByRole('textbox'), 'task 01');
    fireEvent.click(screen.getByText(/add items/i));
    expect(postTasks).toHaveBeenCalled();
  });
});
