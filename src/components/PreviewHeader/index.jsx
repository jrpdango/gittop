import StyledLink from '../StyledLink';
import styles from './style.module.css';

export default function PreviewHeader(props) {
    return (
        <>
            <div className={styles["preview-header"]}>
                <div>
                    {props.children}
                    <span>{formatBytes(props.fileSize)}</span>
                </div>
                <StyledLink href={props.raw} title="Raw" />
                {
                    props.fileName && props.downloadUrl &&
                    <a download={props.fileName} href={props.downloadUrl}>Download</a>
                }
            </div>
            <div className={styles["raw-info"]}>
                {/* TODO: Add info on raw link */} 
                Raw links have a short lifespan. Try refreshing the page if it leads you to a 404.
            </div>
        </>
    );
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}