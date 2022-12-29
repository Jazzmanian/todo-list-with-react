import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from '../TodoForm';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { postTasks } from '../../api';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../api/index');

describe('TodoForm', () => {
  const mockTasks: any = {
    name: 'task name',
    completed: true,
  };
  const queryClient = new QueryClient();

  it('should show input', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoForm />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(
      screen.getByPlaceholderText('Enter your todo item')
    ).toBeInTheDocument();
  });
  it('should show button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoForm />
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText(/add items/i)).toBeInTheDocument();
  });

  it('should clear input when click the button', () => {
    (postTasks as jest.Mock).mockResolvedValue(mockTasks);
    const input = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoForm />
        </ThemeProvider>
      </QueryClientProvider>
    ).getByLabelText('todo-input');
    userEvent.type(input, 'abc');
    fireEvent.click(screen.getByText(/add items/i));
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('should handle onChange', () => {
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoForm />
        </ThemeProvider>
      </QueryClientProvider>
    );
    const input = utils.getByLabelText('todo-input');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect((input as HTMLInputElement).value).toBe('abc');
  });

  it('should not add task when input spaces', () => {
    const input = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TodoForm />
        </ThemeProvider>
      </QueryClientProvider>
    ).getByLabelText('todo-input');
    const text = '      ';
    userEvent.type(input, text);
    fireEvent.click(screen.getByText(/add items/i));
    expect(screen.queryByDisplayValue(text)).not.toBeInTheDocument();
  });
});
