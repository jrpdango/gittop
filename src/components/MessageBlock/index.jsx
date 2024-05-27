import styles from './style.module.css';

export default function MessageBlock({title, message, children}) {
    return (
        <div className={styles["msg-block"]}>
            { title && <h4 className={styles["title"]}>{title}</h4> }
            { message && <span className={styles["message"]}>{message}</span> }
            { children }
        </div>
    );
}