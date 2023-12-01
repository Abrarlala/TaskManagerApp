import React, { useState } from "react";
import useTask from "../Context/TaskContext";

function TaskItem({ task }) {
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const [taskMsg, setTaskMsg] = useState(task.task);

  const { deleteTask, updateTask, toggleCheck } = useTask();

  const editTask = () => {
    updateTask(task.id, { ...task, task: taskMsg });
    setIsTaskEditable(false);
  };
  const toggleChecked = () => {
    toggleCheck(task.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        task.check ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={task.check}
        onChange={toggleChecked}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTaskEditable ? "border-black/10 px-2" : "border-transparent"
        } ${task.check ? "line-through" : ""}`}
        value={taskMsg}
        onChange={(e) => setTaskMsg(e.target.value)}
        readOnly={!isTaskEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (task.check) return;

          if (isTaskEditable) {
            editTask();
          } else setIsTaskEditable((prev) => !prev);
        }}
        disabled={task.check}
      >
        {isTaskEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTask(task.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TaskItem;
