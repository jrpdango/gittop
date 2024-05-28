import { useEffect, useState } from 'react';
import styles from './style.module.css';
import MessageBlock from '../MessageBlock';

export default function ImageViewer({src, alt}) {
    const [hasError, setHasError] = useState(false);
    const [dimensions, setDimensions] = useState({
        height: null,
        width: null
    });

    useEffect(() => {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            setDimensions({
                height: image.naturalHeight,
                width: image.naturalWidth
            });
        }
    }, [src]);

    return (
        <>
        {
            !hasError &&
            <div className={styles["image-viewer"]}>
                <img 
                    alt={alt} 
                    src={src} 
                    decoding="async" 
                    onError={() => { setHasError(true) }}
                />
                {
                    dimensions.width && dimensions.width > 0 &&
                    <h5>{`${dimensions.width}x${dimensions.height}`}</h5>
                    || <></>
                }
            </div>
        }
        {
            hasError &&
            <MessageBlock title="🤔" message="Can't seem to preview this file. Try downloading it instead." />
        }
        </>
    );
}