import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.min.css';
import Loading from '../Loading';
import styles from './style.module.css';

export default function CodeViewer({content, extension, shouldRenderContent = true}) {
    const highlighted = highlight({
        text: content,
        extension
    });

    return (
        <>
            {
                shouldRenderContent ?
                <pre className={`hljs ${styles.hljs}`}>
                    <code className={styles['file-content']}>
                        {
                            format(highlighted, shouldRenderContent)
                        }
                    </code>
                </pre> :
                <Loading />
            }
        </>
    );
}

function format(content, shouldRender) {
    const lastIndex = content.length - 1;
    const children = [];
    content.forEach((line, index) => {
        if (!(line.startsWith('\r'))) {
            children.push(<span className={styles.line} key={index} dangerouslySetInnerHTML={{ __html: shouldRender && `${line}${(index < lastIndex) ? '\n' : ''}` }} />);
            return
        }
        children.push(<span className={styles.line} key={crypto.randomUUID()}><br /></span>);
        children.push(<span className={styles.line} key={index} dangerouslySetInnerHTML={{ __html: shouldRender && `${line.substring(1)}${(index < lastIndex) ? '\n' : ''}` }} />);
    })
    return children;
}

function highlight({ text, extension }) {
    let highlighted;
    // Check if language exists, otherwise, render as plaintext
    try {
        highlighted = hljs.highlight(text, { language: extension });
    } catch (_) {
        highlighted = hljs.highlight(text, { language: 'text' });
    }
    const splitContent = highlighted.value.split('\n');
    return splitContent;
}