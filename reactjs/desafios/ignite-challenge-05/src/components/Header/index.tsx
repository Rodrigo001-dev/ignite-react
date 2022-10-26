import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={commonStyles.container}>
      <div className={styles.hedaerContent}>
        <img src="/images/logo.svg" alt="Logo SpaceTraveling" />
      </div>
    </header>
  );
}
