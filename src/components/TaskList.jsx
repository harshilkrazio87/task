import React, { useEffect, useState } from "react";
import { getTasks } from "./taskService";
import TaskItem from "./TaskItem";

const TaskList = ({ setEdit, setIsOpen, refresh, filter, search }) => {
  const [tasks, setTasks] = useState([]);

    const fetchTask = async () => {
      const data = await getTasks();
      setTasks(data);
    };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTask();
  }, [refresh]);

  const filterTasks = tasks.filter((task) => {
    return filter === "All" ? true : task.status === filter; 
  }).filter((task) => {
    return task.title.toLowerCase().includes(search.toLowerCase());
  });
  console.log(filterTasks);
  
  return (
    <>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterTasks.map((task) => (
            <TaskItem key={task.id} task={task} setEdit={setEdit} setIsOpen={setIsOpen} />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
