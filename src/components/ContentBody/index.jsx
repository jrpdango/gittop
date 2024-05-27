import ContentTree from '../ContentTree';
import FilePreview from '../FilePreview';
import { Octokit } from 'octokit';
import MessageBlock from '../MessageBlock';
import MarkdownParser from '../MarkdownParser';
import ContentContainer from '../ContentContainer';
import Loading from '../Loading';
import { decrypt } from '../../utils/tokenCrypto';
import { decodeContent } from '../../utils/decodeContent';
import { useState, useEffect, useRef } from 'react';

const octokit = new Octokit();

export default function ContentBody({owner, repo, token, path, headerTitle}) {
    const componentIsMounted = useRef(true);
    const [displayedElement, setDisplayedElement] = useState(
        <ContentContainer>
            <Loading />
        </ContentContainer>
    );

    useEffect(() => {
        return () => {
            componentIsMounted.current = false;
        };
    }, []);

    useEffect(() => {
        async function determineDisplay() {
            const decryptedToken = await decrypt(token);

            try {
                const { content: repoContent } = await requestGithubData({ owner, repo, token: decryptedToken, path });

                if (repoContent.data.type === 'dir') {
                    const readMe = repoContent.data.entries.find((item) => item.name.toLowerCase() === 'readme.md');
                    const contentTree = (
                        <ContentContainer title={headerTitle}>
                            <ContentTree items={repoContent.data.entries} repo={repo} owner={owner} token={token} path={path} />
                        </ContentContainer>
                    );

                    if (readMe) {
                        const { content } = await requestGithubData({ owner, repo, token: decryptedToken, path: `${path}/${readMe.name}` });
                        setDisplayedElement(
                            <>
                                {contentTree}
                                <ContentContainer title="README.md">
                                    <MarkdownParser markdown={decodeContent(content.data.content)} />
                                </ContentContainer>
                            </>
                        );
                        return;
                    }
                    // If response is a directory, we can just return it
                    setDisplayedElement(contentTree);
                } else {
                    // Otherwise, it's a file
                    const { content, extension } = await requestGithubData({ owner, repo, token: decryptedToken, path });
                    setDisplayedElement(
                        <ContentContainer title={headerTitle} hasSmallerBottomPadding={true}>
                            <FilePreview file={content} extension={extension} />
                        </ContentContainer>
                    );
                }
            } catch(e) {
                console.error(e);
                setDisplayedElement(
                    <ContentContainer>
                        <MessageBlock title="Uh oh!" message={"That URL seems to be invalid. Maybe there's a typo in there or your token's expired?"} />
                    </ContentContainer>
                );
            }
        }

        determineDisplay();
    }, [path]);

    return(displayedElement);
}

async function requestGithubData({ owner, repo, token, path }) {
    const extension = path.split('.').pop();
    const content = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path: path ?? '',
        headers: {
            'accept': 'application/vnd.github.object+json',
            'user-agent': 'Gittop/0.0.1',
            'authorization': `Bearer ${token}`,
            // 'request-id': crypto.randomUUID(),
        }
    });

    return { content, extension };
}