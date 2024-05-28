import { Link } from 'react-router-dom';
import styles from '../../styles/button-style.module.css';

export default function StyledLink({
    title,
    leading,
    className = '',
    style = {},
    href = '#',
    target = '_blank',
}) {
    return (
        <Link
            to={href}
            className={`${styles["styled-button"]} ${className}`}
            style={style}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : ''}
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
        </Link>
    );
}