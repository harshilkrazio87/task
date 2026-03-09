import React from "react";

const Filter = ({setIsOpen, setEdit,setFilter}) => {
  return (
    <>
      <div className="bg-white border-b-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-6 text-gray-600 font-medium flex-wrap justify-center sm:justify-start">
            <button onClick={() => setFilter("All")} className="text-blue-500 cursor-pointer">
              All
            </button>
            <button onClick={() => setFilter("To Do")} className="hover:text-blue-500 cursor-pointer">
              To Do
            </button>
            <button onClick={() => setFilter("In Progress")} className="hover:text-blue-500 cursor-pointer">
              In Progress
            </button>
            <button onClick={() => setFilter("Done")} className="hover:text-blue-500 cursor-pointer">
              Done
            </button>
          </div>

          {/* Add Task Button */}
          <button 
          onClick={() => {
            setEdit(null);
            setIsOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
            + Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default Filter;
