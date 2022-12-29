import { screen, fireEvent, render } from '@testing-library/react';
import TodoItem from '../TodoItem';

const mockDeleteMutate = jest.fn();
const mockCheckMutate = jest.fn();
jest.mock('../../hooks/useTodos', () => ({
  useTodos: () => ({
    deleteMutation: { mutate: mockDeleteMutate },
    checkMutation: { mutate: mockCheckMutate },
  }),
}));
describe('TodoItem test', () => {
  const mockTask = {
    id: 1,
    name: 'task name',
    completed: true,
  };

  it('should call delete method with relevant task id', async () => {
    expect.assertions(1);
    render(<TodoItem key={mockTask.id} task={mockTask} />);
    await fireEvent.click(screen.getByLabelText('delete-btn'));
    expect(mockDeleteMutate).toHaveBeenCalled();
  });

  it('should call check method with relevant task id', async () => {
    expect.assertions(1);
    render(<TodoItem key={mockTask.id} task={mockTask} />);
    await fireEvent.click(screen.getByLabelText('check-btn'));
    expect(mockCheckMutate).toHaveBeenCalledTimes(1);
  });
});
