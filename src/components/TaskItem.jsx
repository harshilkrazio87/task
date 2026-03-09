import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteTask } from "./taskService";

const TaskItem = ({ task, setEdit, setIsOpen }) => {

  const handleDelete = async () => {
    //  delete  here
    await deleteTask(task.id);
    window.location.reload(); // Refresh the page to reflect changes
  }

  return (
    <>
      <div className="p-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="flex justify-between items-center">
            <span
              className={`text-xs font-semibold rounded-full ${task.status === "To Do" && "bg-yellow-100 text-yellow-600"}
            ${task.status === "In Progress" && "bg-blue-100 text-blue-600"}
            ${task.status === "Done" && "bg-green-100 text-green-600"}
            `}
            >
              {task.status}
            </span>
            <div className="flex gap-3 text-gray-500">
              <FiEdit 
              onClick={() => {
                setEdit(task);
                setIsOpen(true);
              }}
              className="cursor-pointer hover:text-blue-500" />
              <FiTrash2 
              onClick={handleDelete}
              className="cursor-pointer hover:text-red-500" />
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-2">{task.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{task.description}</p>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
