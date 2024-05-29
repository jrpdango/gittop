import StyledLink from '../StyledLink';
import StyledAnchor from '../StyledAnchor';
import styles from './style.module.css';

export default function PreviewHeader(props) {
    return (
        <>
            <div className={styles["preview-header"]}>
                <div>
                    {props.children}
                    <span>{formatBytes(props.fileSize)}</span>
                </div>
                <StyledAnchor
                    title='Download'
                    download={props.fileName}
                    href={props.downloadUrl}
                    leading={
                        <img
                            src="/download-icon.svg"
                            alt="Download Icon"
                            height="16"
                            width="16"
                        />
                    }
                />
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