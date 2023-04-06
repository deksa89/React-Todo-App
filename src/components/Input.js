import React, { useState } from "react";

import './Input.css';

const Input = () => {
  const [jobTasks, setJobTasks] = useState([]);
  const [privateTasks, setPrivateTasks] = useState([]);
  // const [currentSymbol, setCurrentSymbol] = useState("X")
  // const [color, setColor] = useState("#ff0000");



  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = event.target.elements.task.value;
    const taskType = event.target.elements.type.value;
    if (taskType === "job") {
      setJobTasks([...jobTasks, { task: newTask, solved: false, color: "#ff0000" }]);
    } else {
      setPrivateTasks([...privateTasks, { task: newTask, solved: false, color: "#ff0000" }]);
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

  const handleSolved = (index, taskType) => {
    if (taskType === "job") {
      setJobTasks(jobTasks.map((task, i) => (i === index ? { ...task, solved: !task.solved, color: task.solved ? "#ff0000" : "#00ff00" } : task)));
    } else {
      setPrivateTasks(privateTasks.map((task, i) => (i === index ? { ...task, solved: !task.solved, color: task.solved ? "#ff0000" : "#00ff00" } : task)));
    }
  };

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
                  {task.task}
                </li>
                <button className="inp__solved" onClick={() => handleSolved(index, "job")} style={{ backgroundColor: task.color }}>
                  {task.solved ? "✓" : "X"}
                </button>
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
                  {task.task}
                </li>
                <button className="inp__solved" onClick={() => handleSolved(index, "private")} style={{ backgroundColor: task.color }}>
                  {task.solved ? "✓" : "X"}
                </button>
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
