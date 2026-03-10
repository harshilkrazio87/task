import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit,setEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <>
      <Header setSearch={setSearch} />
      <Filter  setIsOpen={setIsOpen} setEdit={setEdit} setFilter={setFilter} />
      <TaskList setEdit={setEdit} setIsOpen={setIsOpen} refresh={refresh} filter={filter} search={search} />
      <TaskForm isOpen={isOpen} setIsOpen={setIsOpen} taskData={edit} setRefresh={setRefresh} />
    </>
  );
};

export default App;
