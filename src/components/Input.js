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
    <div className="inp__app">
      <form onSubmit={handleSubmit}>
        <input className="inp__input" type="text" name="task" />
        <button className="inp__button" type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <div className="inp__task" key={index}>
            <li className="inp__li">
              {task}
            </li>
            <button className="inp__delete" onClick={() => handleDelete(index)}>X</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Input;
