import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useToggle } from './hooks/useToggle';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { TodoContainer } from './styles/Container.styles';
import { theme } from './styles/theme';

const App: React.FC = () => {
  const { data, addTodo, handleDelete, toggleComplete } = useToggle();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TodoContainer>
        <TodoForm addTodo={addTodo} />
        <TodoList
          taskList={data}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      </TodoContainer>
    </ThemeProvider>
  );
};

export default App;
