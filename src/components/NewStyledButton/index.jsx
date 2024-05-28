import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default function NewStyledButton({
    title,
    leading,
    style = {},
    onClick = () => { }
}) {
    return (
        <button
            type="button"
            className={`${styles["styled-button"]} ${className}`}
            style={style}
            onClick={onClick}
        >
            {
                leading ?
                    <div>
                        {leading ?? ''}
                        <span style={{ width: '4px' }}></span>
                        {title}
                    </div>
                    :
                    title
            }
        </button>
    );
}