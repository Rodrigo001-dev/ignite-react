import { Notepad } from "phosphor-react";

import styles from "./EmptyList.module.css";

export function EmptyList() {
  return (
    <div className={styles.emptyList}>
      <Notepad size={96} color="#808080" />
      <div className={styles.emptyListDescription}>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  );
}
