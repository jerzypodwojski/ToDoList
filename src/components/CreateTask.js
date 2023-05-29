import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTask() {
  const [taskName, setTaskName] = useState('');

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await axios.put('http://localhost/todolist/create-task', {
        name: taskName
      });
      setTaskName('');
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          value={taskName}
          onChange={event => setTaskName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}