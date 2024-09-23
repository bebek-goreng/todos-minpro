"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "@/libs/global-state";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
    }
  }, [setToken]);

  return (
    <div className="w-64 dark:border-none border-r border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
      <div className="p-6 flex flex-col">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
            <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <h2 className="text-lg">{user ? user.name : "Guest"}</h2>
          </div>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              href="/my-day"
              className="block py-2 px-4 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              My Day
            </Link>
          </li>
          <li>
            <Link
              href="/important"
              className="block py-2 px-4 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              Important
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className="block py-2 px-4 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              Tasks
            </Link>
          </li>
          <li>
            <Link
              href="/completed"
              className="block py-2 px-4 text-sm font-semibold rounded hover:bg-gray-200 dark:hover:bg-gray-700">
              Completed
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
