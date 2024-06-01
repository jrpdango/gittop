import { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function Loading() {
    const [showSlowText, setShowSlowText] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowSlowText(true);
        }, 3000);
    });

    return (
        <div 
            className={styles["loading-container"]}
            style={showSlowText ? {} : { marginBottom: '25vh'}}
        >
            <img
                className={styles.icon}
                src={import.meta.env.BASE_URL + "gittop-logo.png"}
                alt="loading"
            />
            {
                showSlowText && <h5 className={styles.text}>Seems like this is taking a while. The GitHub API may be slow or down right now.</h5>
            }
        </div>
    );
}