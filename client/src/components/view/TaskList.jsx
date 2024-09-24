"use client";

import { useState } from "react";
import { updateTodos, deleteTodos, createTodos } from "@/modules/fetch-todos";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function TaskList({ tasks = [], fetchTask }) {
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("MyDay");

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const taskData = {
        title: newTask,
        category: category,
        date: newDate,
        time: newTime,
      };

      try {
        setLoading(true);
        const createdTask = await createTodos(taskData);
        setNewTask("");
        setNewDate("");
        setNewTime("");
        fetchTask();
      } catch (error) {
        console.error("Failed to add task:", error);
        alert("Failed to add task. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTodos(task.id, {
        status: "complete",
      });

      console.log("<<<<<<< INI COMPLETE TASK", updatedTask);
      fetchTask();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTodos(taskId);
      fetchTask();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="flex-1 p-3 flex flex-col">
      <div className="overflow-auto mb-20">
        <h1 className="text-lg text-center font-bold mb-4">My Day</h1>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tasks available
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-200 dark:bg-gray-800 p-4 rounded flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                  />
                  <span
                    className={`text-sm ${
                      task.completed ? "line-through" : ""
                    }`}>
                    {task.title}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {task.date && <span>{task.date} </span>}
                  {task.time && <span>{task.time}</span>}
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 dark:text-red-400 ml-4 flex items-center">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="fixed bottom-0 left-64 w-[calc(100%-16rem)] bg-gray-100 dark:bg-gray-900 p-4 px-5 rounded-lg flex items-center space-x-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task"
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded w-full focus:outline-none"
          disabled={loading}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded focus:outline-none"
          disabled={loading}>
          <option value="MyDay">My Day</option>
          <option value="Important">Important</option>
          <option value="Task">Task</option>
        </select>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="p-2 border dark:text-black border-gray-300 dark:border-gray-600 rounded focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 p-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800"
          disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
