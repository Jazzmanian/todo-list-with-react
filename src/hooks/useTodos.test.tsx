import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { getTasks, postTasks } from '../api';
import { ITask } from '../types';
import { useTodos } from './useTodos';

jest.mock('../api/index');
describe('useTodos test', () => {
  it('should return task list when useTodos is called', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useTodos(), { wrapper });
    await waitFor(() =>
      expect(result.current.data).toEqual({ data: mockData })
    );
  });
  it('should add task', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];

    (getTasks as jest.Mock).mockResolvedValue({ data: mockData });
    const { result } = renderHook(() => useTodos(), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: mockData });
    });
    (postTasks as jest.Mock).mockResolvedValue({ data: mockData });
    act(() => {
      result.current.addMutation;
    });
    await waitFor(() => {
      expect(result.current.data).toEqual({ data: mockData });
    });
  });
  it('should refetch the data when invalidate queries', async () => {
    jest.mock('react-query', () => ({
      ...jest.requireActual('react-query'),
      useQueryClient: () => ({
        ...jest.requireActual('react-query').useQueryClient(),
        getQueryData: jest
          .fn()
          .mockReturnValueOnce({
            data: [{ id: 1, name: 'task 01', completed: false }],
          })
          .mockReturnValueOnce({
            data: [{ id: 2, name: 'task 02', completed: false }],
          }),
      }),
    }));
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const mockData: ITask[] = [
      {
        name: 'task 02',
        completed: false,
        id: 1,
      },
    ];
    const { result } = renderHook(() => useTodos(), { wrapper });
    act(() => {
      result.current.addMutation;
    });
    await waitFor(() => {
      expect(queryClient.getQueryData).toBeCalled();
    });
  });
});
