import React from "react";
import { TaskProvider } from "./Context/TaskContext";
import { useState, useEffect } from "react";
import TaskForm from "./Component/TaskForm";
import TaskItem from "./Component/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [{ id: Date.now(), ...task }, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id, task) => {
    setTasks((prev) =>
      prev.map((prevtask) => (prevtask.id === id ? task : prevtask))
    );
  };

  const toggleCheck = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, check: !task.check } : task
      )
    );
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks && tasks.length > 0) {
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskProvider
      value={{ tasks, addTask, updateTask, deleteTask, toggleCheck }}
    >
      <div className="bg-[#250780] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Tasks
          </h1>
          <div className="mb-4">
            <TaskForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="w-full ">
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
