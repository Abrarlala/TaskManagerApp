import { createContext, useContext } from "react";

export const TaskContext = createContext({
  tasks: [
    {
      id: 1,
      task: "",
      check: false,
    },
  ],
  addTask: (task) => {},
  deleteTask: (id) => {},
  updateTask: (id, task) => {},
  toggleCheck: (id) => {},
});

export const TaskProvider = TaskContext.Provider;

export default function useTask() {
  return useContext(TaskContext);
}
