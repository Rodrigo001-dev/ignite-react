import { ThumbsUp, Trash } from "phosphor-react";

import { Avatar } from "./Avatar";

import styles from "./Comment.module.css";

export function Comment({ content }) {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/Rodrigo001-dev.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Rodrigo Rael</strong>
              <time
                title="11 de Abril ás 08:13h"
                datatype="2023-04-11 08:13:30"
              >
                Cerca de 1h atrás
              </time>
            </div>

            <button title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
