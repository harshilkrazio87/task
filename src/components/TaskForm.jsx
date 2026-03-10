import React, { useEffect, useState } from "react";
import { addTask, updateTask } from "./taskService";

const TaskForm = ({ isOpen, setIsOpen, taskData, setRefresh }) => {
  const [FormData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (taskData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      });
    }
  }, [taskData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskData) {
      await updateTask(taskData.id, {
        title: FormData.title,
        description: FormData.description,
        status: FormData.status,
      });
    } else {
      await addTask({
        title: FormData.title,
        description: FormData.description,
        status: FormData.status,
      });
    }
    setFormData({ title: "", description: "", status: "" }); // Reset form
    setIsOpen(false); // Close the modal after submission
    setRefresh((prev) => !prev); // Trigger refresh in TaskList
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white w-150 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task Title"
              name="title"
              value={FormData.title}
              onChange={(e) =>
                setFormData({ ...FormData, title: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={FormData.description}
              onChange={(e) =>
                setFormData({ ...FormData, description: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="status"
              value={FormData.status}
              onChange={(e) =>
                setFormData({ ...FormData, status: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
