import styles from './style.module.css';
import ContentHeader from '../ContentHeader';

export default function ContentContainer({children, title = '', hasSmallerBottomPadding = false}) {
    return (
        <div className={styles["content-container"]}>
            {
                title ? <ContentHeader title={title} hasSmallerBottomPadding={hasSmallerBottomPadding} /> : <></>
            }
            {children}
        </div>
    );
}