import React, { useEffect, useState } from "react";
import { getTasks } from "./taskService";
import TaskItem from "./TaskItem";

const TaskList = ({ setEdit, setIsOpen, refresh, filter, search, user }) => {
  const [tasks, setTasks] = useState([]);

  // fetch tasks from firebase
  const fetchTask = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTask();
  }, [refresh, user]);

  // filter tasks by status and search
  const filterTasks = tasks
    .filter((task) => {
      return filter === "All" ? true : task.status === filter;
    })
    .filter((task) => {
      return task.title.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <>
      <div className="max-w-8xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterTasks.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No tasks found.
          </p>
        ) : (
          filterTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setEdit={setEdit}
              setIsOpen={setIsOpen}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TaskList;
