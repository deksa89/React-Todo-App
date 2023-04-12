import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Input.css';



const Input = () => {
  const [jobTasks, setJobTasks] = useState([]);
  const [privateTasks, setPrivateTasks] = useState([]);

// const randomLightColors = () => {
//     return "hsl(" + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (85 + 10 * Math.random()) + '%)'
// }

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
  // u ovom kodu kreiramo objekt s properties: id, task, solved i color te ga kopiramo u prazni jobTasks i privateTasks objekt koristeci spread operator  
  if (taskType === "job") {
    setJobTasks([...jobTasks, { id: generateRandomId(), task: newTask, solved: false, color: "#c5b0b0"}]); // randomizedColor: randomLightColors()
  } else {
    setPrivateTasks([...privateTasks, { id: generateRandomId(), task: newTask, solved: false, color: "#c5b0b0"}]); // randomizedColor: randomLightColors()
  }
  event.target.elements.task.value = "";
};

const handleDelete = (id, taskType) => {
  if (taskType === "job") {
    setJobTasks(jobTasks.filter((task) => task.id !== id));
  } else {
    setPrivateTasks(privateTasks.filter((task) => task.id !== id));
  }
};
 
// da bi svaki gumb djelovao neovisno, moramo stvoriti niz objekata koji sadrže stanje svakog task state-a, uključujući njegov status solved i color
// koristimo map funkciju da (loop) prodemo kroz jobTasks/privateTasks
// za task na zadanom indexu, funkcija updatea solved property (true/false) i color property (crvena/zelena)
// updateani taskovi su postavljeni kao novi state na jobTasks i na privateTasks
const handleSolved = (id, taskType) => {
  if (taskType === "job") {
    setJobTasks(jobTasks.map((task) => task.id === id ? { ...task, solved: !task.solved, color: task.solved ? "#c5b0b0" : "#00ff00" } : task))
  } else {
    setPrivateTasks(privateTasks.map((task) => task.id === id ? { ...task, solved: !task.solved, color: task.solved ? "#c5b0b0" : "#00ff00" } : task))
  }
}

const handleSelectColor = (event) => {
  const selectedValue = event.target.value; 
    if (selectedValue === 'high') {event.target.style.color = '#ff0000'; } 
    else if (selectedValue === 'low') {event.target.style.color = '#3aa500'; } 
    else if (selectedValue === 'medium') {event.target.style.color = '#ad7a00'; }
  }

const handleOnDragEnd = (result) => {
  // prvi dio provjerava da li je draggable item bačen u dropable kontenjer, ako nije nista se ne desava
  if (!result.destination) {
    return;
  }

  // provjerava iz kojeg kontenjera je predmet izvučen 
  const sourceTasks = result.source.droppableId === 'job' ? jobTasks : privateTasks;

  // provjerava u koji je kontenjer izvučeni predmet ubačen
  const destinationTasks = result.destination.droppableId === 'job' ? jobTasks : privateTasks;

  // zatim funkcija briše predmet iz sourceTasks koristeci splice metodu, a obrisani predmet je spremljen u varijablu removed 
  const [removed] = sourceTasks.splice(result.source.index, 1);

  // obrisani predment pomocu splice dodajemo na željenu poziciju => result.destination.index
  destinationTasks.splice(result.destination.index, 0, removed);

  // update-amo jobTasks i privateTasks s promjenama koristeci spread operator
  setJobTasks([...jobTasks]);
  setPrivateTasks([...privateTasks]);
};


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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="inp__group-tasks">
        <div className="inp__job-tasks">
          <h2>Job Tasks</h2>
          <Droppable droppableId="job">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {jobTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div className="inp__task-job" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <li className="inp__li">
                          {task.task}
                        </li>
                        <select className="inp__select-task" defaultValue="medium" onChange={handleSelectColor} >
                          <option className="inp__option-high" value="high">High</option>
                          <option className="inp__option-medium" value="medium">Medium</option>
                          <option className="inp__option-low" value="low">Low</option>
                        </select>
                        <button className="inp__solved" onClick={() => handleSolved(task.id, "job")} style={{backgroundColor: task.color}}>{task.solved ? "✓" : "⏳"}</button>
                        <button className="inp__delete" onClick={() => handleDelete(task.id, "job")}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className="inp__private-tasks">
          <h2>Private Tasks</h2>
          <Droppable droppableId="private">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {privateTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div className="inp__task-private" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <li className="inp__li">
                          {task.task}
                        </li>
                        <select className="inp__select-task" defaultValue="medium" onChange={handleSelectColor}>
                          <option className="inp__option-high" value="high">High</option>
                          <option className="inp__option-medium" value="medium">Medium</option>
                          <option className="inp__option-low" value="low">Low</option>
                        </select>
                        <button className="inp__solved" onClick={() => handleSolved(task.id, "private")} style={{backgroundColor: task.color}}>{task.solved ? "✓" : "⏳"}</button>
                        <button className="inp__delete" onClick={() => handleDelete(task.id, "private")}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  </div>
);
};

export default Input;
