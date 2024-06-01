import { useEffect, useState } from 'react';
import styles from './style.module.css';
import TextField from '../../components/TextField';
import { encrypt } from '../../utils/tokenCrypto';
import StyledButton from '../StyledButton';
import GithubTokenHelper from '../GithubTokenHelper';
import StyledLink from '../StyledLink';

export default function RepoForm() {
    const [currentUrl, setCurrentUrl] = useState('');
    const [repo, setRepo] = useState('');
    const [githubToken, setGithubToken] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [showFillFormText, setShowFillFormText] = useState(false);
    const [showGithubTokenHelp, setShowGithubTokenHelp] = useState(false);
    const [isVisitButtonEnabled, setIsVisitButtonEnabled] = useState(false);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    });

    if (showGithubTokenHelp) {
        return <GithubTokenHelper onBack={() => { setShowGithubTokenHelp(false) }} />;
    } else {
        return (
            <>
                <img 
                    src={ import.meta.env.BASE_URL + "gittop-logo.png" }
                    className={styles.logo}
                    height="50" 
                    width="50"
                    alt="Gittop"
                />
                <form className={styles["textfield-column"]} action="">
                    <TextField
                        title="Repository URL"
                        value={repo}
                        placeholder="https://github.com/username/repository"
                        onChange={text => setRepo(text)}
                    />
                    <TextField
                        title="GitHub Access Token"
                        titleTrailing={
                            <button type="button" className={styles.help} onClick={() => { setShowGithubTokenHelp(true) }}>
                                Where can I find this?
                            </button>
                        }
                        value={githubToken}
                        onChange={text => setGithubToken(text)}
                    />
                </form>
                <StyledButton
                    title="Generate URL"
                    onClick={async () => {
                        if (!(repo && githubToken)) {
                            setShowFillFormText(true);
                            return;
                        }
                        setShowFillFormText(false);
                        try {
                            // Check if URL is valid
                            const url = new URL(await generateUrl({ repoUrl: repo, githubToken, currentUrl }));
                            setResultUrl(url.toString());
                            setIsVisitButtonEnabled(true);
                        } catch (e) {
                            setResultUrl(e.message);
                            setIsVisitButtonEnabled(false);
                        }
                    }}
                />
                <div className={`${styles["fill-form-text"]} ${showFillFormText ? '' : 'hidden'}`}>Please fill all the above fields.</div>
                <div className={styles["generated-url"]}>
                    <TextField
                        title="Generated URL"
                        disabled={true}
                        pasteMode={false}
                        value={resultUrl}
                        buttonDisabled={!isVisitButtonEnabled}
                    />
                </div>
                <div>
                    <StyledLink
                        title="Visit URL"
                        href={resultUrl}
                        style={isVisitButtonEnabled ? {} : { visibility: 'hidden' }}
                    />
                </div>
            </>
        );
    }
}

async function generateUrl({ repoUrl, githubToken, currentUrl }) {
    try {
        const url = new URL(repoUrl);
        if (url.hostname !== 'github.com') {
            throw new Error();
        }
        const splitUrl = url.pathname.split('/').slice(1);
        if (splitUrl.length < 2 || !splitUrl[0] || !splitUrl[1]) {
            throw new Error();
        }
        const repo = splitUrl[1];
        const owner = splitUrl[0];
        const encryptedToken = await encrypt(githubToken);
        return `${currentUrl}display?repo=${repo}&owner=${owner}&token=${encryptedToken}`;
    } catch (_) {
        throw new Error('Invalid URL. Try checking the above fields again.');
    }
}