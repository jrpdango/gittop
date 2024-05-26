import RepoForm from '../../components/RepoForm';
import styles from './style.module.css';

export default function Root() {
    return (
        <div className={styles.main}>
            <RepoForm />
        </div>
    );
}