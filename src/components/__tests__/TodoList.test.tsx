import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList test', () => {
  beforeEach(() => {
    mockHandleDelete.mockReset();
  });
  const mockHandleDelete: jest.Mock = jest.fn();
  it('should render task list', () => {
    const mockTasks = [
      {
        id: 1,
        name: 'task01',
        completed: false,
      },
      {
        id: 2,
        name: 'task02',
        completed: true,
      },
    ];

    render(<TodoList taskList={mockTasks} handleDelete={mockHandleDelete} />);
    expect(screen.getByText('task01')).toBeInTheDocument();
    expect(screen.getByText('task02')).toBeInTheDocument();
  });
});
