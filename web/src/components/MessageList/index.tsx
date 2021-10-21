import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

export function MessageList() {
    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile-2021" />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/banzak1.png" alt="Banzak" />
                        </div>
                        <span>Banzak</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/banzak1.png" alt="Banzak" />
                        </div>
                        <span>Banzak</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Não vejo a hora de começar</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/banzak1.png" alt="Banzak" />
                        </div>
                        <span>Banzak</span>
                    </div>
                </li>

            </ul>
        </div>
    )
}