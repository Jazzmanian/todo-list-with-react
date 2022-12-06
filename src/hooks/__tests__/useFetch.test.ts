import { ITask } from '../../types';
import axios from 'axios';
import { useFetch } from '../useFetch';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

jest.mock('axios');
describe('useFetch test', () => {
  it('should return task data when useFetch called', async () => {
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
  it('should return error when useFetch is rejected', () => {
    const mockError = { message: 'error' };
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(mockError.message))
    );
    const { result } = renderHook(() => {
      useFetch('http://localhost:8080/tasks');
    });
    try {
    } catch (error: any) {
      expect(error.message).toEqual(mockError);
    }
  });
  it('should add an item when addTodo is called', async () => {
    // const mockInitialState: ITask[] =[];
    // React.useState = jest.fn().mockReturnValue([mockInitialState, {} ]);
    // const {result} = renderHook(()=>{
    //   useFetch('http://localhost:8080/tasks');
    // })
    // expect(result.current.addTodo('task 01'))
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
    // await waitForNextUpdate();
    // expect(result.current.data).toEqual(mockData);
    act(async () => {
      result.current.addTodo({ name: 'new task', completed: false });
    });
    // expect(result.current.data).toBe(undefined);
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
  });
  it('should delete an item when handleDelete is called', async () => {
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
