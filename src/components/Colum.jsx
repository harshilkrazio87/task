import React from "react";

const Colum = () => {
  return (
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
          <h2 class="font-semibold">To-do</h2>
          <span class="text-gray-400 text-sm">3</span>
        </div>
        <button class="text-gray-400 text-xl">+</button>
      </div>
    </div>
  );
};

export default Colum;
