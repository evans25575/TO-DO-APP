import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { alarmService } from './services/alarmService';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Initialize alarm service
    alarmService.init();
    
    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    
    fetchTodos();
    
    return () => {
      alarmService.cleanup();
    };
  }, []);

  useEffect(() => {
    // Update alarms whenever todos change
    alarmService.setAlarms(todos);
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', todoData);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });
      setTodos(todos.map(todo => todo.id === id ? response.data : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List with Alarms</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;
