import React, { useState } from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ITask, AddTodo, HandleDelete } from './types';

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const addTodo: AddTodo = (newTodo: string) => {
    setTaskList((prevTaskList) => [
      { id: prevTaskList.length + 1, name: newTodo, completed: false },
      ...taskList,
    ]);
  };

  const handleDelete: HandleDelete = (deleteId: number) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.id !== deleteId)
    );
    // console.log(`delete ${deleteId}`);
  };

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <TodoForm addTodo={addTodo} />
        <TodoList taskList={taskList} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
