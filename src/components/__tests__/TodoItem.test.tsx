import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from '../TodoItem';

const mockDeleteMutate = jest.fn();
const mockCheckMutate = jest.fn();
jest.mock('../../hooks/useTodos', () => ({
  useTodos: () => ({
    deleteMutation: () => ({ mutate: mockDeleteMutate }),
    checkMutation: () => ({ mutate: mockCheckMutate }),
  }),
}));
// jest.mock('react-query');
// const mockedMutate = jest.fn();

// jest.mock('../../hooks/useTodos', () => ({
//   useTodos: () => ({
//     deleteMutation: () => ({ mutate: jest.fn() }),
//   }),
// }));
// const mockedUseCustomMutation = useTodos as jest.Mock;

// expect(mockedMutate).toHaveBeenCalledTimes(1);

describe('TodoItem test', () => {
  const mockTask = {
    id: 1,
    name: 'task name',
    completed: true,
  };

  it('should call delete method with relevant task id', async () => {
    render(<TodoItem key={mockTask.id} task={mockTask} />);
    await fireEvent.click(screen.getByLabelText('delete-btn'));
    // expect(screen.queryByDisplayValue('task name')).not.toBeInTheDocument();
    expect(mockDeleteMutate).toHaveBeenCalled();
    // await waitFor(() => {
    //   expect(mockedUseCustomMutation().mutate.mock.calls.length).toBe(1);
    // });
  });

  it('should call check method with relevant task id', async () => {
    render(<TodoItem key={mockTask.id} task={mockTask} />);
    await fireEvent.click(screen.getByLabelText('check-btn'));
    expect(mockCheckMutate).toHaveBeenCalledTimes(1);
  });
});
