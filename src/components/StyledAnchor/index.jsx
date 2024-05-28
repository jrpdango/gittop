import styles from '../../styles/button-style.module.css';

export default function StyledAnchor({
    title,
    leading,
    download,
    className = '',
    style = {},
    href = '#',
    target = '_blank',
}) {
    return (
        <a
            href={href}
            className={`${styles["styled-button"]} ${className}`}
            download={download ?? ''}
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
        </a>
    );
}