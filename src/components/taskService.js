import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import db from "../firebase";
import { auth } from "../firebase";

// helper to get current user id (returns null if not logged in)
const getUserId = () => auth.currentUser?.uid || null;

export const addTask = async (task) => {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User must be logged in to add a task");
  }
  try {
    await addDoc(collection(db, "tasks"), {
      ...task,
      userId,
    });
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

export const getTasks = async () => {
  const userId = getUserId();
  if (!userId) return [];

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  const tasks = [];
  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.id,
      ...doc.data(),
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

