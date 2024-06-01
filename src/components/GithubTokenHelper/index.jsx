import styles from "./style.module.css";
import StyledButton from "../StyledButton";

export default function GithubTokenHelper({onBack = () => {}}) {
    return (
        <>
            <div className={styles["back-button"]}>
                <StyledButton
                    title="Back"
                    leading={
                        <img
                            src={import.meta.env.BASE_URL + "up-arrow.svg"}
                            alt="Left arrow icon"
                            style={{ height: '16px', width: '16px', transform: 'rotate(270deg)' }}
                        />
                    }
                    onClick={onBack}
                />
            </div>
            <div className={styles.body}>

                <div className={styles.text}>
                    <h3 className={styles.title}>How do I get my GitHub Personal Access Token?</h3>
                    <ol className={styles.steps}>
                        <li>Visit your GitHub account&apos;s settings.
                            Navigate to &quot;Developer settings&quot; on the left-hand side, click &quot;Personal access tokens&quot;,
                            then &quot;Fine-grained tokens&quot;. Lastly, click &quot;Generate new token&quot;.
                            You&apos;ll be asked to login or enter your 2FA code if you have that set up.
                            <br />
                            <a href="https://github.com/settings/personal-access-tokens/new" target="_blank">Click this link to go there.</a>
                        </li>
                        <br />
                        <li>Assign a name and expiration for your token.</li>
                    </ol>
                    <div className={styles.title}>
                        <h4>It&apos;s recommended to limit the permissions a token can have as much as possible.
                            <br />
                            <br />
                            Unless you know what you&apos;re doing, try having only one (read-only) token for each repo you want to access.
                            <br />
                        </h4>
                    </div>
                    <ol start="3" className={styles.steps}>
                        <li>Click &quot;Only select repositories&quot; and pick the repository you want the token to have access in.</li>
                        <br />
                        <li>Click on &quot;Repository permissions&quot;, and set &quot;Contents&quot; to &quot;Read-only&quot;.</li>
                        <br />
                        <li>Review your choices, then click &quot;Generate token&quot;.</li>
                    </ol>
                </div>
            </div>
        </>
    );
}