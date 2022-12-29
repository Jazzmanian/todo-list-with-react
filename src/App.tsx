import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { TodoContainer } from './styles/Container.styles';
import { theme } from './styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <TodoContainer>
          <TodoForm />
          <TodoList />
        </TodoContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
