import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem test', () => {
  beforeEach(() => {
    mockHandleDelete.mockReset();
  });
  const mockHandleDelete: jest.Mock = jest.fn();
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
      />
    );
    fireEvent.click(screen.getByLabelText('delete-btn'));
    expect(mockHandleDelete).toBeCalled();
  });
});
