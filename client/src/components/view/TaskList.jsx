"use client";

import { getAllTodos } from "@/modules/fetch-todos";
import { useEffect, useState } from "react";

export default function TaskList({ props }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", date: "", time: "", completed: false },
    { id: 2, text: "Task 2", date: "", time: "", completed: false },
  ]);
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          text: newTask,
          date: newDate,
          time: newTime,
          completed: false,
        },
      ]);
      setNewTask("");
      setNewDate("");
      setNewTime("");
    }
  };

  // useEffect(() => {
  //   const fetchTask = async () => {
  //     try {
  //       const params = {
  //         category: "MyDay",
  //       };
  //       const task = await getAllTodos(params);
  //       setTask(task.data);
  //     } catch (error) {
  //       console.log(`error fetching task: ${error}`);
  //     }
  //   };

  //   fetchTask();
  // }, []);

  return (
    <div className="flex-1 p-3 flex flex-col">
      <div className="overflow-auto mb-20">
        <h1 className="text-lg text-center font-bold mb-4">My Day</h1>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" className="mr-4" />
                <span className="text-sm">{task.text}</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {task.date && <span>{task.date} </span>}
                {task.time && <span>{task.time}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-0 left-64 w-[calc(100%-16rem)] bg-gray-100 dark:bg-gray-900 p-4 px-5 rounded-lg flex items-center space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded w-full focus:outline-none"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded focus:outline-none"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded focus:outline-none"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800">
          Add
        </button>
      </div>
    </div>
  );
}
