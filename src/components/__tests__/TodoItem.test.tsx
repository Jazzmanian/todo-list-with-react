import { screen, fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import TodoItem from '../TodoItem';

jest.mock('axios');
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

  it('should call delete method with relevant task id', async () => {
    expect.assertions(2);
    (axios.delete as jest.Mock).mockResolvedValue(mockTask.id);
    const url = 'http://localhost:8080/tasks';
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    await fireEvent.click(screen.getByLabelText('delete-btn'));

    expect(axios.delete).toHaveBeenCalled();
    expect(axios.delete).toHaveBeenCalledWith(`${url}/${mockTask.id}`);
  });
  it('should call check method with relevant task id', async () => {
    expect.assertions(1);
    (axios.put as jest.Mock).mockResolvedValue(mockTask.id);
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    await fireEvent.click(screen.getByLabelText('check-btn'));

    expect(axios.put).toHaveBeenCalled();
  });
  it('should return error when delete method is called', async () => {
    expect.assertions(0);
    const mockError = { message: 'error' };
    (axios.delete as jest.Mock).mockImplementation(
      async () => await Promise.reject(new Error(mockError.message))
    );
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    try {
      await fireEvent.click(screen.getByLabelText('delete-btn'));
    } catch (error: any) {
      expect(error.message).toEqual(mockError);
    }
  });
  it('should return error when put method is called', async () => {
    expect.assertions(0);
    const mockError = { message: 'error' };
    (axios.put as jest.Mock).mockImplementation(
      async () => await Promise.reject(new Error(mockError.message))
    );
    render(
      <TodoItem
        key={mockTask.id}
        task={mockTask}
        handleDelete={mockHandleDelete}
        toggleComplete={mockToggleComplete}
      />
    );
    try {
      await fireEvent.click(screen.getByLabelText('check-btn'));
    } catch (error: any) {
      expect(error.message).toEqual(mockError);
    }
  });
});
