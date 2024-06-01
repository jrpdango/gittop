import styles from './style.module.css';

export default function RepoItem({ item = {}, onClick = () => {} }) {
    return (
        <div className={styles.row} onClick={onClick}>
            <img
                // If the current item is a directory, show the folder icon, else, show the file icon
                src={item?.type === 'dir' ? import.meta.env.BASE_URL + 'folder-icon.svg' : import.meta.env.BASE_URL + 'file-icon.svg'}
                className={styles.icon}
                alt="Repo Item"
            />
            <p className={styles.name}>{item.name}</p>
        </div>
    );
}