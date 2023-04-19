import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={commonStyles.container}>
      <div className={styles.hedaerContent}>
        <Link href="/">
          <a>
            <img src="/images/logo.svg" alt="Logo SpaceTraveling" />
          </a>
        </Link>
      </div>
    </header>
  );
}
