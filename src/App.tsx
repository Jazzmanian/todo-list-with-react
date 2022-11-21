import React, { useState } from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ITask, AddTodo } from './types';

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const addTodo: AddTodo = (newTodo: string) => {
    setTaskList((prevTaskList) => [
      { id: prevTaskList.length + 1, name: newTodo, completed: false },
      ...taskList,
    ]);
  };

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <TodoForm addTodo={addTodo} />
        <TodoList taskList={taskList} />
      </div>
    </div>
  );
};

export default App;
