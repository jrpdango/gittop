import styles from './style.module.css';
import { Suspense } from 'react';
import Loading from '../../components/Loading';
import ContentContainer from '../../components/ContentContainer';
import Header from '../../components/Header';
import ContentBody from '../../components/ContentBody';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';

export default function Display() {
    const [searchParams, _] = useSearchParams();
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const token = searchParams.get('token');
    const path = searchParams.get('path') ?? '';
    const extension = path?.split('.').pop();

    const subPaths = determineSubPaths({ owner, repo, token, path });
    const isRoot = subPaths.currentSegment === '/';

    if([owner, repo, token].includes(undefined || null)) {
        return <ErrorMessage title="Whoops." message="Owner, repo, or token may have not been provided. Try checking again." />;
    }

    return (
        <div>
            <Header subPaths={subPaths} repo={repo} isRoot={isRoot} />
            <Suspense
                key={path}
                fallback={
                    <ContentContainer>
                        <Loading />
                    </ContentContainer>
                }>
                <ContentBody repo={repo} owner={owner} token={token} path={path} headerTitle={isRoot ? repo : subPaths.currentSegment} />
            </Suspense>
            {
                extension === 'pdf' ?
                    <div className={styles["pdf-help"]}>
                        <span>If the PDF does not load, try refreshing this page or checking if your file is valid.</span>
                    </div>
                    : <></>
            }
        </div>
    );
}

function determineSubPaths({ owner, repo, token, path }) {
    const segments = (path ?? '').split('/');
    const currentSegment = segments.pop();

    if (!currentSegment) {
        return {
            currentSegment: '/',
            paths: [{
                href: `?repo=${repo}&owner=${owner}&token=${token}`,
                segment: repo
            }]
        };
    }

    return {
        currentSegment,
        paths: segments.map((segment, index) => {
            const currentPath = (segments.slice(0, index + 1)).join('/');
            return {
                href: `?repo=${repo}&owner=${owner}&token=${token}&path=${currentPath}`,
                segment: segment ? segment : repo
            };
        })
    };
}