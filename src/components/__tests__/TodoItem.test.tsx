import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem test', () => {
  beforeEach(() => {
    mockHandleDelete.mockReset();
    mockToggleComplete.mockReset();
  });
  const mockHandleDelete: jest.Mock = jest.fn();
  const mockToggleComplete: jest.Mock = jest.fn();
  const mockTask = {
    id: 1,
    name: 'task name',
    completed: true,
  };

  it('should render tasks', () => {
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
  });
  it('should execute a callback function when the delete button is pressed', () => {
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    fireEvent.click(screen.getByLabelText('delete-btn'));
    expect(mockHandleDelete).toBeCalled();
  });

  it('should execute a callback function when the complete button is pressed', () => {
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    fireEvent.click(screen.getByLabelText('check-btn'));
    expect(mockToggleComplete).toBeCalledWith(1);
  });
});
