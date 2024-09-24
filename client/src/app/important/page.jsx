"use client";

import Layout from "@/components/view/Layout";
import TaskList from "@/components/view/TaskList";
import { getAllTodos } from "@/modules/fetch-todos";
import { useEffect, useState } from "react";

const MydDay = () => {
  const [task, setTask] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await getAllTodos({
        category: "Important",
        status: "Incomplete",
      });

      setTask(response.data);
    } catch (error) {
      console.log(`error fetching todos data: ${error}`);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const filteringTask = task.filter((t) => {
    return t.category === "Important" && t.status === "incomplete";
  });

  return (
    <div>
      <Layout>
        <TaskList
          tasks={filteringTask}
          fetchTask={fetchTask}
          todosCategory={"Important"}
        />
      </Layout>
    </div>
  );
};

export default MydDay;
