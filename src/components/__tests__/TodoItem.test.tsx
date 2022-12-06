import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import TodoItem from '../TodoItem';

// jest.mock('axios', () => ({
//   ...jest.requireActual('axios'),
//   get: jest.fn(),
//   delete: jest.fn(),
// }));
jest.mock('axios');
// jest.mock('../deleteTask'); //mock module
describe('TodoItem test', () => {
  beforeEach(() => {
    mockHandleDelete.mockReset();
    mockToggleComplete.mockReset();
  });
  const mockHandleDelete: jest.Mock = jest.fn();
  const mockToggleComplete: jest.Mock = jest.fn();
  // const deleteTask: jest.Mock = jest.fn();
  const mockTask = {
    id: 1,
    name: 'task name',
    completed: true,
  };

  //   it('should render tasks', () => {
  //     render(
  //       <TodoItem
  //         key={mockTask.id}
  //         task={mockTask}
  //         handleDelete={mockHandleDelete}
  //         toggleComplete={mockToggleComplete}
  //       />
  //     );
  //     expect(screen.getByText(mockTask.name)).toBeInTheDocument();
  //   });
  //   it('should execute a callback function when the delete button is pressed', () => {
  //     render(
  //       <TodoItem
  //         key={mockTask.id}
  //         task={mockTask}
  //         handleDelete={mockHandleDelete}
  //         toggleComplete={mockToggleComplete}
  //       />
  //     );
  //     fireEvent.click(screen.getByLabelText('delete-btn'));
  //     expect(mockHandleDelete).toBeCalled();
  //   });

  //   it('should execute a callback function when the complete button is pressed', () => {
  //     render(
  //       <TodoItem
  //         key={mockTask.id}
  //         task={mockTask}
  //         handleDelete={mockHandleDelete}
  //         toggleComplete={mockToggleComplete}
  //       />
  //     );
  //     fireEvent.click(screen.getByLabelText('check-btn'));
  //     expect(mockToggleComplete).toBeCalledWith(1);
  //   });

  it('should call delete method with relevant task id', async () => {
    // const id = 1;
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

    // (axios.get as jest.Mock).mockImplementation(async () =>
    //   Promise.resolve([])
    // );
    await fireEvent.click(screen.getByLabelText('delete-btn'));

    expect(axios.delete).toHaveBeenCalled();
    expect(axios.delete).toHaveBeenCalledWith(`${url}/${mockTask.id}`);
  });
  it('should call check method with relevant task id', async () => {
    (axios.put as jest.Mock).mockResolvedValue(mockTask.id);
    const url = 'http://localhost:8080/tasks';
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
    const mockError = { message: 'error' };
    (axios.delete as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(mockError.message))
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
    const mockError = { message: 'error' };
    (axios.put as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(mockError.message))
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
