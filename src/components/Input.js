import React, { useState } from "react";

import './Input.css';

const Input = () => {
  const [jobTasks, setJobTasks] = useState([]);
  const [privateTasks, setPrivateTasks] = useState([]);
  const [colors, setColors] = useState({});
  const [symbols, setSymbols] = useState({});


  const handleColorChange = (index) => {
    const newColors = { ...colors };
    console.log("newColors: ", newColors)
    console.log("index1: ", index)
    newColors[index] = newColors[index] === "#ff0000" ? "#00ff00" : "#ff0000";
    setColors(newColors);
  };

  const handleSymbolChange = (index) => {
    const newSymbols = { ...symbols };
    console.log("newSymbols: ", newSymbols)
    console.log("index2: ", index)
    newSymbols[index] = newSymbols[index] === "X" ? "O" : "X";
    setSymbols(newSymbols);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = event.target.elements.task.value;
    const taskType = event.target.elements.type.value;
    if (taskType === "job") {
      setJobTasks([...jobTasks, newTask]);
      setColors({ ...colors, [jobTasks.length]: "#ff0000" });
      setSymbols({ ...symbols, [jobTasks.length]: "X" });
    } else {
      setPrivateTasks([...privateTasks, newTask]);
      setColors({ ...colors, [privateTasks.length]: "#ff0000" });
      setSymbols({ ...symbols, [privateTasks.length]: "X" });
    }
    event.target.reset();
  };

  const handleDelete = (index, taskType) => {
    if (taskType === "job") {
      const newColors = { ...colors };
      const newSymbols = { ...symbols };
      delete newColors[index];
      delete newSymbols[index];
      setColors(newColors);
      setSymbols(newSymbols);
      setJobTasks(jobTasks.filter((task, i) => i !== index));
    } else {
      const newColors = { ...colors };
      const newSymbols = { ...symbols };
      delete newColors[index];
      delete newSymbols[index];
      setColors(newColors);
      setSymbols(newSymbols);
      setPrivateTasks(privateTasks.filter((task, i) => i !== index));
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
                  {task}
                </li>
                <button className="inp__solved" onClick={() => {
                  handleColorChange(index);
                  handleSymbolChange(index);
                }} style={{ backgroundColor: colors[index] }}>{symbols[index]}</button>
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
                <button className="inp__solved" onClick={() => {
                  handleColorChange(index);
                  handleSymbolChange(index);
                }} style={{ backgroundColor: colors[index] }}>{symbols[index]}</button>
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
