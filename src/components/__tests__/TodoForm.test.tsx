import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';
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

  it('should clear input when click the button', () => {
    const input = render(<TodoForm />).getByLabelText('todo-input');
    userEvent.type(input, 'abc');
    fireEvent.click(screen.getByText(/add items/i));
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('should handle onChange', () => {
    const utils = render(<TodoForm />);
    const input = utils.getByLabelText('todo-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect((input as HTMLInputElement).value).toBe('abc');
  });
});
