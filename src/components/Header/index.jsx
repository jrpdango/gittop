import { Link } from 'react-router-dom';
import styles from './style.module.css';
import StyledButton from '../StyledButton';
import { useEffect, useState } from 'react';


export default function Header({subPaths, repo, isRoot}) {
    const [scrollOffset, setScrollOffset] = useState(0);
    const isBrowser = () => typeof window !== 'undefined';

    useEffect(() => {
        const onScroll = () => setScrollOffset(window.scrollY);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    });

    return (
        <div className={styles.header}>
            <div className={styles["path-links"]}>
                <a href={import.meta.env.BASE_URL}>
                    <img 
                        src={import.meta.env.BASE_URL + "gittop-logo.png"} 
                        className={styles.logo} 
                        height={30} 
                        width={30} 
                    />
                </a>
                {
                    !isRoot ?
                        subPaths.paths.map((subPath) => (
                            <div key={crypto.randomUUID()}>
                                <Link to={subPath.href} className={styles["path-link"]}>
                                    {subPath.segment}
                                </Link>
                                &nbsp;/&nbsp;
                            </div>
                        )) :
                        <></>
                }
                {isRoot ? repo : subPaths.currentSegment}
            </div>
            <StyledButton 
                title="Top"
                className={ scrollOffset > 0 ? '' : 'hidden' }
                leading={
                    <img 
                        src={import.meta.env.BASE_URL + "up-arrow.svg"}
                        alt="Up arrow icon" 
                        style={{ height: '16px', width: '16px' }}
                    />
                }
                onClick={() => { 
                    if(isBrowser()) window.scrollTo({ top: 0, behavior: 'smooth' })
                }} 
            />
        </div>
    );
}