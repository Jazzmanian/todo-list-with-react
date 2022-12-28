import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoList from '../TodoList';

describe('TodoList test', () => {
  it('should render task list when fetch the data', async () => {
    expect.assertions(1);
    const testQueryClient = new QueryClient();
    const { ...result } = render(
      <QueryClientProvider client={testQueryClient}>
        <TodoList />
      </QueryClientProvider>
    );
    expect(await result.findByText(/task 01/i)).toBeInTheDocument();
  });
});
