import React ,{useContext} from 'react';
import GithubContext from '../../context/GitHub/githubContext';
import RepoItem from './RepoItem';

function Repos() {
    const githubContext = useContext(GithubContext);

    return githubContext.repos.map( repo => (
        <RepoItem repo={repo} key={repo.id}/>
    ))
}

export default Repos;
