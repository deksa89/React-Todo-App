import React, { useState } from "react";

import './Input.css';

const Input = () => {
  const [jobTasks, setJobTasks] = useState([]);
  const [privateTasks, setPrivateTasks] = useState([]);

const randomLightColors = () => {
    return "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)'
}

const generateRandomId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

const handleSubmit = (event) => {
  event.preventDefault();
  const newTask = event.target.elements.task.value; // npr. newTask:  do dishes
  const taskType = event.target.elements.type.value; // npr. taskType: Private Tasks
  
  // spread operator (...) nam omogucava da kopiramo dio ili cijeli objekt u drugi objekt 
  // u ovom kodu kreiramo objekt s properties: task, solved i color te ga kopiramo u prazni jobTasks i privateTasks objekt koristeci spread operator  
  if (taskType === "job") {
    setJobTasks([...jobTasks, { id: generateRandomId(), task: newTask, solved: false, color: "#c5b0b0", randomizedColor: randomLightColors()}]);
  } else {
    setPrivateTasks([...privateTasks, { id: generateRandomId(), task: newTask, solved: false, color: "#c5b0b0", randomizedColor: randomLightColors()}]);
  }
  event.target.elements.task.value = "";
};

const handleDelete = (index, taskType) => {
  if (taskType === "job") {
    setJobTasks(jobTasks.filter((task) => task.id !== index));
  } else {
    setPrivateTasks(privateTasks.filter((task) => task.id !== index));
  }
};
 
// da bi svaki gumb djelovao neovisno, moramo stvoriti niz objekata koji sadrže stanje svakog task state-a, uključujući njegov status solved i color
// koristimo map funkciju da (loop) prodemo kroz jobTasks/privateTasks
// za task na zadanom indexu, funkcija updatea solved property (true/false) i color property (crvena/zelena)
// updateani taskovi su postavljeni kao novi state na jobTasks i na privateTasks
const handleSolved = (index, taskType) => {
  if (taskType === "job") {
    setJobTasks(jobTasks.map((task) => task.id === index ? { ...task, solved: !task.solved, color: task.solved ? "#c5b0b0" : "#00ff00" } : task))
  } else {
    setPrivateTasks(privateTasks.map((task) => task.id === index ? { ...task, solved: !task.solved, color: task.solved ? "#c5b0b0" : "#00ff00" } : task))
  }
}

return (
  <div className="inp__app">
    <form onSubmit={handleSubmit}>
      <input className="inp__input" type="text" name="task" minLength={5} />
      <select className="inp__select-type" name="type">
        <option value="job">Job Tasks</option>
        <option value="private">Private Tasks</option>
      </select>
      <button className="inp__button" type="submit">Add Task</button>
    </form>
    <div className="inp__group-tasks">
      <div className="inp__job-tasks">
        <h2>Job Tasks</h2>
        <ul>
          {jobTasks.map((task) => (
              <div className={`inp__task${task.id === 0 ? ' first' : ''}`} style={{backgroundColor: task.randomizedColor}} key={task.id}>
                <li className="inp__li">
                  {task.task}
                </li>
                <select className="inp__select-task" defaultValue="medium">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="inp__solved" onClick={() => handleSolved(task.id, "job")} style={{backgroundColor: task.color}}>{task.solved ? "✓" : "⏳"}</button>
                <button className="inp__delete" onClick={() => handleDelete(task.id, "job")}>Delete</button>
              </div>
          ))}
        </ul>
      </div>
      <div className="inp__private-tasks">
        <h2>Private Tasks</h2>
        <ul>
          {privateTasks.map((task) => (
              <div className="inp__task" style={{backgroundColor: task.randomizedColor}} key={task.id}>
                <li className="inp__li">
                  {task.task}
                </li>
                <select className="inp__select-task" defaultValue="medium">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button className="inp__solved" onClick={() => handleSolved(task.id, "private")} style={{backgroundColor: task.color}}>{task.solved ? "✓" : "⏳"}</button>
                <button className="inp__delete" onClick={() => handleDelete(task.id, "private")}>Delete</button>
              </div>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
};

export default Input;
