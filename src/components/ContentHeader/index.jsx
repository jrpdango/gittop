import styles from './style.module.css';

export default function ContentHeader({ title, hasSmallerBottomPadding = false }) {
    return (
        <div className={styles["content-header"]}>
            <p className={styles["header-title"]} style={hasSmallerBottomPadding ? {paddingBottom: '8px'} : {}}>{ title }</p>
        </div>
    );
}