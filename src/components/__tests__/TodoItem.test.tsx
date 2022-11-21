import { render, screen } from '@testing-library/react';
import TodoItem from '../TodoItem';

describe('TodoItem test', () => {
  it('should render tasks', () => {
    const mockTask = {
      id: 1,
      name: 'task name',
      completed: true,
    };
    render(<TodoItem key={mockTask.id} task={mockTask} />);
    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
  });
});
