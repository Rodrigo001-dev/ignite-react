import { useState } from "react";

import { Header } from "./components/Header";
import { CreateTodo } from "./components/CreateTodo";
import { TasksDescription } from "./components/TasksDescription";
import { EmptyList } from "./components/EmptyList";
import { TasksList } from "./components/TasksList";

import styles from "./App.module.css";
import "./global.css";

export interface Task {
  id: string;
  isCompleted: boolean;
  title: string;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div>
      <Header />

      <main className={styles.wrapper}>
        <CreateTodo tasks={tasks} setTasks={setTasks} />

        <div className={styles.wrapperList}>
          <TasksDescription tasks={tasks} />

          {tasks.length === 0 ? (
            <EmptyList />
          ) : (
            <TasksList tasks={tasks} setTasks={setTasks} />
          )}
        </div>
      </main>
    </div>
  );
}
