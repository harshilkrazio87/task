import React, { useEffect, useState } from "react";
import { addTask, updateTask, getTasks } from "./taskService";
import { toast } from "react-toastify";

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

    if (!FormData.title || !FormData.description || !FormData.status) {
      toast.error("Please fill all fields");
      return;
    }

    // check existing task
    const allTasks = await getTasks();

    const titleMatch = (t) =>
      t.title.trim().toLowerCase() === FormData.title.trim().toLowerCase() &&
      t.description.trim().toLowerCase() ===
        FormData.description.trim().toLowerCase();

    try {
      if (taskData) {
        await updateTask(taskData.id, {
          title: FormData.title,
          description: FormData.description,
          status: FormData.status,
        });
      } else {
        if (allTasks.some(titleMatch)) {
          toast.error("already exists");
          setFormData({ title: "", description: "", status: "" });
          setIsOpen(false);
          return;
        }
        await addTask({
          title: FormData.title,
          description: FormData.description,
          status: FormData.status,
        });
      }
    } catch (error) {
      toast.error(error.message || "Unable to save task");
      return;
    }
    setFormData({ title: "", description: "", status: "" }); // Reset form
    setIsOpen(false); // Close form
    toast.success(`Task ${taskData ? "updated" : "added"} successfully!`);
    setRefresh((prev) => !prev); // refresh in TaskList
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-sm sm:max-w-md rounded-lg p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {taskData ? "Edit Task" : "Add New Task"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task Title"
              name="title"
              value={FormData.title}
              onChange={(e) =>
                setFormData({ ...FormData, title: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={FormData.description}
              onChange={(e) =>
                setFormData({ ...FormData, description: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="status"
              value={FormData.status}
              onChange={(e) =>
                setFormData({ ...FormData, status: e.target.value })
              }
              className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex justify-end gap-3 mt-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer transition"
              >
                Save
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
