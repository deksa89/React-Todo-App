import React, { useState } from "react";

import './Input.css';

const Input = () => {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //   console.log("event: ", event)
    const newTask = event.target.elements.task.value;
    setTasks([...tasks, newTask]);
    event.target.reset();
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="cls__input" type="text" name="task" />
        <button className="cls__button" type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Input;
