import RepoItem from '../RepoItem';
import { Link } from 'react-router-dom';

export default function ContentTree({ items, owner, repo, token, path }) {
    const currentPath = path.split('/');
    currentPath.pop();
    const previousPath = currentPath.join('/');

    return (
        <>
            {/* '..' button to go back a directory */}
            {
                path &&
                <Link to={`?repo=${repo}&owner=${owner}&token=${token}&path=${previousPath ?? ''}`}>
                    <RepoItem item={{ type: 'dir', name: '..' }} />
                </Link>
            }
            {
                items.map(file => (
                    <Link key={file.path+file.sha} to={`?repo=${repo}&owner=${owner}&token=${token}&path=${`${path ?? ''}/${file.name}`}`}>
                        <RepoItem item={file} />
                    </Link>
                ))
            }
        </>
    );
}