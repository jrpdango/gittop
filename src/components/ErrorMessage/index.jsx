import { useRouteError } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import MessageBlock from '../MessageBlock';
import StyledLink from '../StyledLink';
import styles from './style.module.css';

export default function ErrorMessage({ title = 'Whoops.', message }) {
    const error = useRouteError();
    return (
        <div className={styles['error-message']}>
            <StyledLink
                title="Back to Home"
                href={import.meta.env.BASE_URL}
                leading={
                    <img
                        src={import.meta.env.BASE_URL + "up-arrow.svg"}
                        alt="Left arrow icon"
                        style={{ height: '16px', width: '16px', transform: 'rotate(270deg)' }}
                    />
                }
                target="_self"
                className={styles.back}
            />
            <ContentContainer>
                <MessageBlock title={title} message={message ?? `Something went wrong. Status ${error.status}: ${error.statusText}.`} />
            </ContentContainer>
        </div>
        
    );
}