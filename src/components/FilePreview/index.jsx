import styles from './style.module.css';
import { useState, useEffect } from 'react';
import MarkdownParser from '../MarkdownParser';
import { imageExtensions, previewRenderables, textExtensions } from '../../constants/extensions';
import ImageViewer from '../ImageViewer';
import { decodeContent } from '../../utils/decodeContent';
import CodeViewer from '../CodeViewer';
import PreviewHeader from '../PreviewHeader';
import MessageBlock from '../MessageBlock';
import StyledButton from '../StyledButton';

export default function FilePreview({file, extension}) {
    const [showPreview, setShowPreview] = useState(previewRenderables.includes(extension));
    const [showRaw, setShowRaw] = useState(textExtensions.includes(extension));
    const [shouldRenderContent, setShouldRenderContent] = useState(false);
    const previewSwitch = (
        <div className={styles["preview-code-switch"]}>
            <button className={`${styles["switch-btn"]} ${showPreview ? styles.active : ''}`} type="button" onClick={() => { setShowPreview(true) }}>Preview</button>
            <button className={`${styles["switch-btn"]} ${showPreview ? '' : styles.active}`} type="button" onClick={() => { setShowPreview(false) }}>Code</button>
        </div>
    );

    useEffect(() => {
        setShouldRenderContent(true);
    }, []);

    if(!file.data.html_url) {
        return (
            <MessageBlock
                title="Hmmm."
                message="This might be a nested Git repo, which we can't view here." 
            />
        );
    }

    if (imageExtensions.includes(extension) && extension !== 'svg') {
        return (
            <>
                <PreviewHeader fileSize={file.data.size} raw={file.data.download_url} />
                <ImageViewer alt="Image Preview" src={`data:image/${extension};base64,${file.data.content}`} />
            </>
        );
    }

    switch (extension) {
        case 'pdf': {
            return (
                <>
                    <PreviewHeader 
                        fileSize={file.data.size} 
                        raw={file.data.download_url} 
                        fileName={file.data.name}
                        downloadUrl={`data:application/pdf;base64,${file.data.content}`} 
                    />
                    <iframe className={styles["pdf-viewer"]} src={`data:application/pdf;base64,${file.data.content}`} width="100%">
                        <p className={styles["pdf-fail"]}>Can&apos;t seem to preview the PDF. Try downloading it directly.</p>
                    </iframe>
                </>
                
            );
        }
        case 'svg': {
            const content = decodeContent(file.data.content);
            return (
                <>
                    <PreviewHeader 
                        fileSize={file.data.size} 
                        raw={file.data.download_url}
                        fileName={file.data.name}
                        downloadUrl={`data:image/svg+xml;base64,${file.data.content}`} 
                    >
                        { previewSwitch }
                        <span>&nbsp;·&nbsp;</span>
                    </PreviewHeader>
                    {
                        showPreview ?
                        <ImageViewer alt="SVG Preview" src={`data:image/svg+xml;base64,${file.data.content}`} />
                        :
                        <CodeViewer content={content} extension={extension} shouldRenderContent={shouldRenderContent} />
                    }
                </>
            );
        }    
        case 'md': {
            const content = decodeContent(file.data.content);
            return (
                <>
                    <PreviewHeader fileSize={file.data.size} raw={file.data.download_url}>
                        { previewSwitch }
                        <span>&nbsp;·&nbsp;</span>
                    </PreviewHeader>
                    {
                        showPreview ?
                        <MarkdownParser markdown={content} />
                        :
                        <CodeViewer content={content} extension={extension} shouldRenderContent={shouldRenderContent} />
                    }
                </>
            );
        }  
        default: {
            const content = decodeContent(file.data.content);
            if (showRaw) {
                return (
                    <>
                        <PreviewHeader fileSize={file.data.size} raw={file.data.download_url} />
                        <CodeViewer content={content} extension={extension} shouldRenderContent={shouldRenderContent} />
                    </>
                );
            }
            return (
                <MessageBlock message="This file may not be displayed correctly.">
                    <StyledButton 
                        type="button" 
                        title="View anyway"
                        style={{ marginTop: '16px', paddingLeft: '32px', paddingRight: '32px' }}
                        onClick={() => { setShowRaw(true) }}
                    />
                </MessageBlock>
            );
        }
    }
}