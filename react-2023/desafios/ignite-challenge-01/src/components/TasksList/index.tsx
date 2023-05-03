import { Trash } from "phosphor-react";

import styles from "./TasksList.module.css";

import { Task } from "../../App";

interface TasksListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TasksList({ tasks, setTasks }: TasksListProps) {
  function handleToggleTaskCompletion(id: string) {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            id="check"
            checked={task.isCompleted}
            onClick={() => handleToggleTaskCompletion(task.id)}
          />
          <span>{task.title}</span>
          <Trash size={24} onClick={() => handleRemoveTask(task.id)} />
        </div>
      ))}
    </div>
  );
}
