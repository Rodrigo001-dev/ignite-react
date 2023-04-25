import styles from "./Header.module.css";

import igniteLogo from "../../assets/logo-todo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do desafio de todo" />
    </header>
  );
}
