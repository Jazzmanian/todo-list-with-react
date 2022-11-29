import React, { useEffect, useState } from 'react';
import './styles/App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ITask, AddTodo, HandleDelete, ToggleComplete } from './types';
import axios from 'axios';

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/tasks')
      .then((res) => res.data)
      .then((data) => setTaskList(data))
      .catch((error) => console.log(error));
  }, []);

  const addTodo: AddTodo = (newTodo) => {
    const generatedId = Math.random();
    setTaskList((prevTaskList) => [
      { id: generatedId, name: newTodo, completed: false },
      ...prevTaskList,
    ]);
  };

  const handleDelete: HandleDelete = (deleteId) => {
    setTaskList((prevTaskList) =>
      prevTaskList.filter((task) => task.id !== deleteId)
    );
  };

  const toggleComplete: ToggleComplete = (selectedId) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === selectedId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  console.log(taskList);

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="form">
        <TodoForm addTodo={addTodo} />
        <TodoList
          taskList={taskList}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default App;
