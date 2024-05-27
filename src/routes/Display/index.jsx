import styles from './style.module.css';
import { Suspense } from 'react';
import Loading from '../../components/Loading';
import ContentContainer from '../../components/ContentContainer';
import Header from '../../components/Header';
import { useSearchParams } from 'react-router-dom';

export default function Display() {
    const [searchParams, _] = useSearchParams();
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const token = searchParams.get('token');
    const path = searchParams.get('path') ?? '';
    const extension = path?.split('.').pop();

    const subPaths = determineSubPaths({ owner, repo, token, path });
    const isRoot = subPaths.currentSegment === '/';
    return (
        <div>
            <Header subPaths={subPaths} repo={repo} isRoot={isRoot} />
            {/* <Suspense
                key={path}
                fallback={ */}
                    <ContentContainer>
                        <Loading />
                    </ContentContainer>
                {/* }>
                <ContentBody repo={repo} owner={owner} token={token} path={path} headerTitle={isRoot ? repo : subPaths.currentSegment} />
            </Suspense> */}
            {
                extension === 'pdf' ?
                    <div className={styles["hard-refresh-help"]}>
                        <span>If the PDF does not load, try <a href="https://filecamp.com/support/problem-solving/hard-refresh/" target="#">hard refreshing</a> this page.</span>
                        <span>&nbsp;Otherwise, your file may be invalid.</span>
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
                href: `display?repo=${repo}&owner=${owner}&token=${token}`,
                segment: repo
            }]
        };
    }

    return {
        currentSegment,
        paths: segments.map((segment, index) => {
            const currentPath = (segments.slice(0, index + 1)).join('/');
            return {
                href: `display?repo=${repo}&owner=${owner}&token=${token}&path=${currentPath}`,
                segment: segment ? segment : repo
            };
        })
    };
}