import { ITask } from '../../types';
import axios from 'axios';
import { useFetch } from '../useFetch';
import { act, renderHook } from '@testing-library/react-hooks';
jest.mock('axios');

describe('useFetch test', () => {
  it('should return task data when useFetch called', async () => {
    expect.assertions(3);
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const url = 'http://localhost:8080/tasks';
    const { result, waitForNextUpdate } = renderHook(() => useFetch(url));
    await waitForNextUpdate();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(result.current.data).toEqual(mockData);
  });
  it('should return error when useFetch is rejected', async () => {
    expect.assertions(0);
    const mockError = { message: 'error' };
    (axios.get as jest.Mock).mockImplementation(
      async () => await Promise.reject(new Error(mockError.message))
    );

    try {
      renderHook(() => {
        useFetch('http://localhost:8080/tasks');
      });
    } catch (error: any) {
      expect(error.message).toEqual(mockError);
    }
  });
  it('should add an item when addTodo is called', async () => {
    expect.assertions(1);
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const url = 'http://localhost:8080/tasks';
    const { result, waitForNextUpdate } = renderHook(() => useFetch(url));
    act(() => {
      result.current.addTodo({ name: 'new task', completed: false });
    });
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
  });
  it('should delete an item when handleDelete is called', async () => {
    expect.assertions(2);
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('http://localhost:8080/tasks')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual([
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ]);
    act(() => {
      result.current.handleDelete(1);
    });
    expect(result.current.data).toEqual([]);
  });
  it('should mark as completed when toggleComplete is called', async () => {
    expect.assertions(2);
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('http://localhost:8080/tasks')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual([
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ]);
    act(() => {
      result.current.toggleComplete(1);
    });

    expect(result.current.data).toEqual([
      {
        completed: true,
        id: 1,
        name: 'task 02',
      },
    ]);
  });
  it('should mark as completed when toggleComplete is called', async () => {
    expect.assertions(2);
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('http://localhost:8080/tasks')
    );
    await waitForNextUpdate();
    expect(result.current.data).toEqual([
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ]);
    act(() => {
      result.current.toggleComplete(2);
    });

    expect(result.current.data).toEqual(mockData);
  });
});
