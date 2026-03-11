import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteTask } from "./taskService";

const TaskItem = ({ task, setEdit, setIsOpen }) => {
  const handleDelete = async () => {
    //  delete  here
    await deleteTask(task.id);
    window.location.reload(); // Refresh the page to reflect changes
  };

  return (
    <>
      <div class="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs font-semibold rounded-full px-3 py-1 ${task.status === "To Do" ? "bg-yellow-100 text-yellow-600" : task.status === "In Progress" ? "bg-blue-100 text-blue-600" : task.status === "Done" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
            {task.status}
          </span>
          <div className="flex items-center gap-2.5">
            <FiEdit
              onClick={() => {
                setEdit(task);
                setIsOpen(true);
              }}
              className="cursor-pointer text-blue-500 hover:text-blue-700 w-4 h-4"
            />
            <FiTrash2
              onClick={handleDelete}
              className="cursor-pointer text-red-500 hover:text-red-700 w-4 h-4"
            />
          </div>
        </div>
        <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
        <p class="text-gray-500 text-sm sm:text-base mb-4">
          {task.description}
        </p>
      </div>
    </>
  );
};

export default TaskItem;
