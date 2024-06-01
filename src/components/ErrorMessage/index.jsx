import ContentContainer from '../ContentContainer';
import MessageBlock from '../MessageBlock';

export default function ErrorMessage({ title = '🤔', message = 'Something went wrong.' }) {
    return (
        <ContentContainer>
            <MessageBlock title={title} message={message} />
        </ContentContainer>
    );
}