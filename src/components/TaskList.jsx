import React, { useEffect, useState } from "react";
import { getTasks } from "./taskService";
import TaskItem from "./TaskItem";

const TaskList = ({ setEdit, setIsOpen, refresh, filter }) => {
  const [tasks, setTasks] = useState([]);

    const fetchTask = async () => {
      const data = await getTasks();
      setTasks(data);
    };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTask();
  }, [refresh]);

  const filterTasks = filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filterTasks.map((task) => (
        <TaskItem key={task.id} task={task} setEdit={setEdit} setIsOpen={setIsOpen} />
      ))}
    </div>
  );
};

export default TaskList;
