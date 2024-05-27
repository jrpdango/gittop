import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default function StyledButton({ 
    type, 
    title,
    leading,
    className = '',
    style = {}, 
    href = '#', 
    target = '_blank',
    onClick = () => {} 
}) {
    if(type === 'button') {
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
    } else if(type === 'link') {
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
    } else {
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
}