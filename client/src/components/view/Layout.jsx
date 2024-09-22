"use client";

import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();

      const formatted = `${dayName}, ${day} ${monthName} ${year}`;
      setFormattedDate(formatted);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const timeString = currentTime.toLocaleTimeString();

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <header className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center my-3 mx-7 rounded-lg">
            <div>
              <h1 className="text-sm font-semibold">{formattedDate}</h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {timeString}
              </p>
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="sr-only"
                  />
                  <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                  <div
                    className={`dot absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
                      darkMode ? "translate-x-4 bg-blue-500" : ""
                    }`}></div>
                </div>
                <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </span>
              </label>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
