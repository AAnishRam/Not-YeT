import React, { useState } from "react";
import "./TaskBoard.css";

const Task = ({ task, deleteTask }) => {
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  return (
    <div className="task-row">
      <div className="task-name">{task.name}</div>
      <div className="task-assigned">{task.assignedTo}</div>

      {/* Dropdown for Priority */}
      <select
        className={`task-priority ${priority.toLowerCase()}`}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Dropdown for Status */}
      <select
        className={`task-status ${status.toLowerCase().replace(" ", "-")}`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="On track">On track</option>
        <option value="At risk">At risk</option>
        <option value="Off track">Off track</option>
      </select>

      {/* Delete Task Button */}
      <button className="delete-task" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
};

const TaskSection = ({ title, tasks, addTask, deleteTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState("");

  const handleAddTask = () => {
    if (newTaskName.trim() && newTaskAssignedTo.trim()) {
      addTask(title, newTaskName, newTaskAssignedTo);
      setNewTaskName("");
      setNewTaskAssignedTo("");
    }
  };

  return (
    <div className="task-section">
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={index} task={task} deleteTask={deleteTask} />
      ))}
      <div className="add-task">
        <input
          type="text"
          placeholder="Task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned to"
          value={newTaskAssignedTo}
          onChange={(e) => setNewTaskAssignedTo(e.target.value)}
        />
        <button onClick={handleAddTask}>Add task</button>
      </div>
    </div>
  );
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        name: "Task 1",
        assignedTo: "PersonA",
        priority: "Low",
        status: "On track",
      },
      {
        id: 2,
        name: "Task 2",
        assignedTo: "PersonB",
        priority: "Medium",
        status: "At risk",
      },
    ],
    doing: [],
    done: [],
  });

  const addTask = (section, name, assignedTo) => {
    const newTask = {
      id: Date.now(),
      name,
      assignedTo,
      priority: "Low",
      status: "On track",
    };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [section.toLowerCase()]: [...prevTasks[section.toLowerCase()], newTask],
    }));
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      Object.keys(updatedTasks).forEach((section) => {
        updatedTasks[section] = updatedTasks[section].filter(
          (task) => task.id !== taskId
        );
      });
      return updatedTasks;
    });
  };

  return (
    <div className="task-board">
      <TaskSection
        title="To Do"
        tasks={tasks.todo}
        addTask={addTask}
        deleteTask={deleteTask}
      />
      <TaskSection
        title="Doing"
        tasks={tasks.doing}
        addTask={addTask}
        deleteTask={deleteTask}
      />
      <TaskSection
        title="Done"
        tasks={tasks.done}
        addTask={addTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskBoard;
