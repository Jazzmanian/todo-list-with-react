import React from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <TodoForm />
      </div>
    </div>
  );
};

export default App;
