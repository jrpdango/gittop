import styles from './style.module.css';
import { useRef } from 'react';

export default function TextField({
    title,
    value,
    titleTrailing,
    placeholder = '',
    pasteMode = true,
    disabled = false,
    buttonDisabled = false,
    onChange = (text) => { }
}) {
    const hoverText = pasteMode ? 'Paste Text' : 'Copy Text';
    const activeText = pasteMode ? 'Pasted Text' : 'Copied Text';
    const buttonRef = useRef(null);
    let timeout;

    function removeFocus() {
        buttonRef.current.blur();
    }

    return (
        <div className={styles.textfield}>
            <div className={styles.title}>
                <h4>{title}</h4>
                {
                    titleTrailing ?? <></>
                }
            </div>
            <div className={styles["field-and-copy"]}>
                <input
                    type="text"
                    className={`${styles.field} textfield-input`}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                />
                <button
                    type="button"
                    className={`${styles.interactive} ${buttonDisabled ? '' : styles.tooltip}`}
                    disabled={buttonDisabled}
                    style={buttonDisabled ? { cursor: 'not-allowed' } : {}}
                    ref={buttonRef}
                    data-hover-tooltip={hoverText}
                    data-active-tooltip={activeText}
                    // Cancel removing the green "Copied" tooltip if hovering before it disappears 
                    onMouseOver={() => {
                        if (buttonRef.current.classList.contains(styles.active)) {
                            clearTimeout(timeout);
                        }
                    }}
                    onClick={async (_) => {
                        if (pasteMode) {
                            try {
                                onChange((await navigator.clipboard.readText()).trim());
                            } catch (e) {
                                console.log('Could not read clipboard.');
                                return;
                            }
                        } else {
                            await navigator.clipboard.writeText(value);
                        }
                        // Remove default tooltip because animation won't play with it there
                        buttonRef.current.classList.remove(styles.tooltip);
                        // Add a 100ms delay because the transition animation doesn't play otherwise
                        setTimeout(() => {
                            buttonRef.current.classList.add(styles.active);
                        }, 100);
                        // Remove "Copied" tooltip after 3s unless cancelled
                        // This is done here in case user navigates with keyboard
                        timeout = setTimeout(() => {
                            buttonRef.current.classList.remove(styles.active);
                        }, 3000);
                        // Default tooltip stays if focus isn't removed
                        removeFocus();
                        // Add back the "Copy Text" tooltip
                        buttonRef.current.classList.add(styles.tooltip);
                    }}
                    onMouseLeave={() => {
                        if (buttonDisabled) return;
                        // Default tooltip stays if focus isn't removed
                        removeFocus();
                        // Remove "Copied" tooltip after 3s unless cancelled
                        if (buttonRef.current.classList.contains(styles.active)) {
                            timeout = setTimeout(() => {
                                buttonRef.current.classList.remove(styles.active);
                            }, 3000);
                        }
                        // Add back the "Copy Text" tooltip
                        buttonRef.current.classList.add(styles.tooltip);
                    }}>

                    <img
                        src={pasteMode ? '/assets/paste-icon.svg' : '/assets/copy-icon.svg'}
                        className={styles["copy-image"]}
                        alt="Copy"
                    />
                </button>
            </div>
        </div>
    );
};