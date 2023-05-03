import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { PlusCircle } from "phosphor-react";

import styles from "./CreateTodo.module.css";

import { Task } from "../../App";

interface CreateTodoProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function CreateTodo({ tasks, setTasks }: CreateTodoProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateTask() {
    if (newTaskTitle.trim() === "") {
      return window.alert("Esse campo é obrigatório");
    }

    const newTask = { id: uuidV4(), title: newTaskTitle, isCompleted: false };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  return (
    <div className={styles.createTodo}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        id="input-todo"
        value={newTaskTitle}
        onChange={(event) => setNewTaskTitle(event.target.value)}
      />
      <button type="button" onClick={handleCreateTask}>
        Criar <PlusCircle size={24} />
      </button>
    </div>
  );
}
