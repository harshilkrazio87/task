import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Filterr from "../components/Filter";
import { getTasks } from "../components/taskService";
import Colum from "../components/Colum";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [refresh, user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <Header setSearch={setSearch} />
      <Filterr setIsOpen={setIsOpen} setEdit={setEdit} setFilter={setFilter} totalTasks={tasks.length} />
      <TaskList
        setEdit={setEdit}
        setIsOpen={setIsOpen}
        refresh={refresh}
        filter={filter}
        search={search}
        user={user}
      />
      <TaskForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        taskData={edit}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default Home;
