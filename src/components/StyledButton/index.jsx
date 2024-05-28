import styles from '../../styles/button-style.module.css';

export default function NewStyledButton({
    title,
    leading,
    className = '',
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