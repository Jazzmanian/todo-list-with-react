import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from './TodoForm';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('TodoForm', () => {
  it('should show input', () => {
    render(<TodoForm />);
    expect(screen.getByLabelText('todo-input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your todo item')
    ).toBeInTheDocument();
  });
  it('should show button', () => {
    render(<TodoForm />);
    expect(screen.getByText(/add items/i)).toBeInTheDocument();
  });

  it('should handle onClick', () => {
    render(<TodoForm />);
    userEvent.type(screen.getByLabelText('todo-input'), 'abc');
    fireEvent.click(screen.getByText(/add items/i));
    expect(screen.getByPlaceholderText('Enter your todo item')).toBeVisible();
  });

  it('should handle onChange', () => {
    const setup = () => {
      const utils = render(<TodoForm />);
      const input = utils.getByLabelText('todo-input');
      return {
        input,
        ...utils,
      };
    };
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'abc' } });
    expect((input as HTMLInputElement).value).toBe('abc');
  });
});
