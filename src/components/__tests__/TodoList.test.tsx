import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoList from '../TodoList';

jest.mock('../../hooks/useTodos', () => ({
  useTodos: () => ({
    data: [{ id: 1, name: 'task01', completed: true }],
  }),
}));
describe('TodoList test', () => {
  it('should render task list when fetch the data', async () => {
    expect.assertions(1);
    const testQueryClient = new QueryClient();
    render(
      <QueryClientProvider client={testQueryClient}>
        <TodoList />
      </QueryClientProvider>
    );
    expect(screen.getByText('task01')).toBeInTheDocument();
  });
});
