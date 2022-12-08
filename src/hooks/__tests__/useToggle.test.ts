import { ITask } from '../../types';
import { useToggle } from '../useToggle';
import { act, renderHook } from '@testing-library/react-hooks';
import { getTasks } from '../../api';

jest.mock('../../api/index');
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
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() => useToggle());
    await waitForNextUpdate();
    expect(getTasks).toHaveBeenCalledTimes(1);
    expect(getTasks).toHaveBeenCalledWith();
    expect(result.current.data).toEqual(mockData);
  });
  it('should return error when useFetch is rejected', async () => {
    expect.assertions(0);
    const mockError = { message: 'error' };
    (getTasks as jest.Mock).mockImplementation(
      async () => await Promise.reject(new Error(mockError.message))
    );

    try {
      renderHook(() => {
        useToggle();
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
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() => useToggle());
    act(() => {
      result.current.addTodo({ id: 2, name: 'new task', completed: false });
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
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() => useToggle());
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
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() => useToggle());
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
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result, waitForNextUpdate } = renderHook(() => useToggle());
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
