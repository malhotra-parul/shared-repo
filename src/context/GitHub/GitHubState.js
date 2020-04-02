import React, { useReducer } from 'react';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import { SEARCH_USERS, GET_USER, CLEAR_USERS, SET_LOADING, GET_REPOS } from '../../types';

const GitHubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [ state, dispatch ] = useReducer(GithubReducer, initialState);

	//SearchUsers

	return (
		<GithubContext.Provider
			value={{
				users: [],
				user: {},
				repos: [],
				loading: false
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GitHubState;
