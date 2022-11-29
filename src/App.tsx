import React, { useState } from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ITask, ToggleComplete } from './types';
import { useFetch } from './api/useFetch';

const App: React.FC = () => {
  const { data, addTodo, handleDelete } = useFetch(
    'http://localhost:8080/tasks'
  );
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const toggleComplete: ToggleComplete = (selectedId) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === selectedId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

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
