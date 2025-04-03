import React from 'react';
import { FaTrash, FaCheck, FaClock, FaBell } from 'react-icons/fa';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour}:${minutes} ${ampm}`;
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <span 
          onClick={() => toggleComplete(todo.id)}
          className="todo-text"
        >
          {todo.task}
        </span>
        
        {(todo.start_time || todo.end_time) && (
          <div className="todo-time">
            <FaClock className="time-icon" />
            <span>{formatTime(todo.start_time)}</span>
            {todo.end_time && (
              <>
                <span className="time-separator">-</span>
                <span>{formatTime(todo.end_time)}</span>
              </>
            )}
          </div>
        )}
        
        {todo.alarm_enabled && (
          <div className="todo-alarm">
            <FaBell className="alarm-icon" />
            <span className="alarm-label">Alarm: {todo.alarm_sound}</span>
          </div>
        )}
      </div>
      
      <div className="todo-actions">
        <button 
          onClick={() => toggleComplete(todo.id)}
          className="complete-btn"
        >
          <FaCheck />
        </button>
        <button 
          onClick={() => deleteTodo(todo.id)}
          className="delete-btn"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;