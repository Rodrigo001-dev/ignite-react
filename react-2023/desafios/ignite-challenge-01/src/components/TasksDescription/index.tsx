import styles from "./TasksDescription.module.css";

import { Task } from "../../App";

interface TasksDescriptionProps {
  tasks: Task[];
}

export function TasksDescription({ tasks }: TasksDescriptionProps) {
  return (
    <div className={styles.description}>
      <span className={styles.createdTasks}>
        Tarefas criadas <span>{tasks.length}</span>
      </span>
      <span className={styles.completedTasks}>
        Concluídas
        <span>
          {tasks.filter((task) => task.isCompleted === true).length} de{" "}
          {tasks.length}
        </span>
      </span>
    </div>
  );
}
