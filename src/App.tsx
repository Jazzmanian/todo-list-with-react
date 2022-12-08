import React from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useToggle } from './hooks/useToggle';

const App: React.FC = () => {
  const { data, addTodo, handleDelete, toggleComplete } = useToggle();

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <TodoForm addTodo={addTodo} />
        <TodoList
          taskList={data}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default App;
