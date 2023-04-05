import React, { useState } from "react";

import './Input.css';

const Input = () => {
  const [jobTasks, setJobTasks] = useState([]);
  const [privateTasks, setPrivateTasks] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState("X")
  const [color, setColor] = useState("#ff0000");



  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = event.target.elements.task.value;
    const taskType = event.target.elements.type.value;
    if (taskType === "job") {
      setJobTasks([...jobTasks, newTask]);
    } else {
      setPrivateTasks([...privateTasks, newTask]);
    }
    event.target.reset();
  };

  const handleDelete = (index, taskType) => {
    if (taskType === "job") {
      setJobTasks(jobTasks.filter((task, i) => i !== index));
    } else {
      setPrivateTasks(privateTasks.filter((task, i) => i !== index));
    }
  };

  const handleSolved = () => {
    if (currentSymbol === "X") {
      setCurrentSymbol("✓");
      setColor("#00ff00");
    } else {
      setCurrentSymbol("X");
      setColor("#ff0000");
    }
  }

  return (
    <div className="inp__app">
      <form onSubmit={handleSubmit}>
        <input className="inp__input" type="text" name="task" minLength={5} />
        <select className="inp__select" name="type">
          <option value="job">Job Tasks</option>
          <option value="private">Private Tasks</option>
        </select>
        <button className="inp__button" type="submit">Add Task</button>
      </form>
      <div className="inp__group-tasks">
        <div className="inp__job-tasks">
          <h2>Job Tasks</h2>
          <ul>
            {jobTasks.map((task, index) => (
              <div className="inp__task" key={index}>
                <li className="inp__li">
                  {task}
                </li>
                <button className="inp__solved" onClick={handleSolved} style={{backgroundColor: color}}>{currentSymbol}</button>
                <button className="inp__delete" onClick={() => handleDelete(index, "job")}>Delete</button>
              </div>
            ))}
          </ul>
        </div>
        <div className="inp__private-tasks">
          <h2>Private Tasks</h2>
          <ul>
            {privateTasks.map((task, index) => (
              <div className="inp__task" key={index}>
                <li className="inp__li">
                  {task}
                </li>
                <button className="inp__solved" onClick={handleSolved}>{currentSymbol}</button>
                <button className="inp__delete" onClick={() => handleDelete(index, "private")}>Delete</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Input;
