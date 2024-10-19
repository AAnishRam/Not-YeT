import React, { useState } from 'react';
import './TaskBoard.css';

const Task = ({ task }) => {
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  return (
    <div className="task-row">
      <div className="task-name">{task.name}</div>

      {/* New Assigned To column */}
      <div className="task-assigned">{task.assignedTo}</div>

      {/* Dropdown for Priority */}
      <select className={`task-priority ${priority.toLowerCase()}`} value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Dropdown for Status */}
      <select className={`task-status ${status.toLowerCase().replace(' ', '-')}`} value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="On track">On track</option>
        <option value="At risk">At risk</option>
        <option value="Off track">Off track</option>
      </select>
    </div>
  );
};

const TaskSection = ({ title, tasks }) => {
  return (
    <div className="task-section">
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
      <div className="add-task">+ Add task...</div>
    </div>
  );
};

const TaskBoard = () => {
  const taskData = {
    todo: [
      { name: "Task 1", assignedTo: "PersonA", priority: "Low", status: "On track" },
      { name: "Task 2", assignedTo: "PersonB", priority: "Medium", status: "At risk" },
      { name: "Task 3", assignedTo: "PersonC", priority: "High", status: "Off track" }
    ],
    doing: [],
    done: []
  };

  return (
    <div className="task-board">
      <TaskSection title="To Do" tasks={taskData.todo} />
      <TaskSection title="Doing" tasks={taskData.doing} />
      <TaskSection title="Done" tasks={taskData.done} />
    </div>
  );
};

export default TaskBoard;
