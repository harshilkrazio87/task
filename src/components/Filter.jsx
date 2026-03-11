import { Filter, Plus } from "lucide-react";
import React from "react";

const Filterr = ({ setIsOpen, setEdit, setFilter, filter, totalTasks }) => {
  return (
    <>
        <div className="bg-white border-b border-slate-200">
        <div className="px-4 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-3 text-center sm:text-left">
            <div>
              <h1 className="text-xl lg:text-2xl font-semibold text-slate-800">My Tasks</h1>
              <p className="text-sm text-slate-500 mt-0.5">Total tasks: {totalTasks}</p>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="gap-2 py-2 px-3 flex item-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded outline-none transition"
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button
                onClick={() => {
                  setEdit(null);
                  setIsOpen(true);
                }} 
                className="flex gap-2 items-center py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer "
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filterr;


      // <div >
      //   <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      //     {/* Filters */}
      //     <div className="flex items-center gap-3 text-gray-700 font-medium flex-wrap justify-center sm:justify-start">
      //       {["All", "To Do", "In Progress", "Done"].map((f) => (
      //         <button
      //           key={f}
      //           onClick={() => setFilter(f)}
      //           className={`px-3 py-1 rounded-full border border-blue-500 transition ${filter === f ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
      //         >
      //           {f}
      //         </button>
      //       ))}
      //     </div>

      //     {/* Add Task Button */}
      //     <button
      //       onClick={() => {
      //         setEdit(null);
      //         setIsOpen(true);
      //       }}
      //       className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 cursor-pointer transition"
      //     >
      //       + Add Task
      //     </button>
      //   </div>
      // </div>