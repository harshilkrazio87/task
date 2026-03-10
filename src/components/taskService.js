import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import db from "../firebase";

export const addTask = async (task) => {
  try {
    // prevent duplicate titles at the service level
    const q = query(collection(db, "tasks"), where("title", "==", task.title));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      // throw so callers know it failed
      throw new Error("Task with this title already exists");
    }
    await addDoc(collection(db, "tasks"), task);
  } catch (error) {
    console.error("Error adding task: ", error);
    // propagate error so UI can react if needed
    throw error;
  }
};

export const getTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return tasks;
};

export const updateTask = async (id, updatedData) => {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, updatedData);
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};