import React, { useState } from 'react';
import { FaPlus, FaClock, FaBell } from 'react-icons/fa';

const alarmSounds = [
  { value: 'default', label: 'Default' },
  { value: 'alarm1', label: 'Classic Alarm' },
  { value: 'alarm2', label: 'Digital Beep' }
];

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmSound, setAlarmSound] = useState('default');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo({
        task,
        start_time: startTime,
        end_time: endTime,
        alarm_enabled: alarmEnabled,
        alarm_sound: alarmSound
      });
      setTask('');
      setStartTime('');
      setEndTime('');
      setAlarmEnabled(false);
      setAlarmSound('default');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="todo-input"
          required
        />
      </div>
      
      <div className="time-inputs">
        <div className="time-group">
          <FaClock className="time-icon" />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="time-input"
          />
        </div>
        <span className="time-separator">to</span>
        <div className="time-group">
          <FaClock className="time-icon" />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="time-input"
          />
        </div>
      </div>
      
      <div className="alarm-settings">
        <label className="alarm-toggle">
          <input
            type="checkbox"
            checked={alarmEnabled}
            onChange={(e) => setAlarmEnabled(e.target.checked)}
          />
          <FaBell className="alarm-icon" />
          <span>Alarm</span>
        </label>
        
        {alarmEnabled && (
          <select
            value={alarmSound}
            onChange={(e) => setAlarmSound(e.target.value)}
            className="alarm-sound-select"
          >
            {alarmSounds.map((sound) => (
              <option key={sound.value} value={sound.value}>
                {sound.label}
              </option>
            ))}
          </select>
        )}
      </div>
      
      <button type="submit" className="todo-button">
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoForm;