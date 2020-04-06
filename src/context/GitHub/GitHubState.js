import React, { useReducer } from 'react';
import axios from 'axios';
import { SEARCH_USERS, GET_USER, ALL_USERS, CLEAR_USERS, SET_LOADING, GET_REPOS,SET_ALERT,SHOW_ALERT } from '../../types';

import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

const client_id = 'f88c36400a1e75d9e468';
const secret_key = '2d1bba9d9889b2c3175a0ed63843ebdc56cbcae8';

const GitHubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert:null
	};

	const [ state, dispatch ] = useReducer(GithubReducer, initialState);

	//SearchUsers
	const searchUsers = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${secret_key}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};
	//all USERS
	const allUsers = async () => {
		setLoading();
		const res = await axios.get(`https://api.github.com/users?client_id=${client_id}&client_secret=${secret_key}`);
		dispatch({
			type: ALL_USERS,
			payload: res.data
		});
	};

	//ClearUsers
	const clearUsers = () => {
		dispatch({
			type: CLEAR_USERS
		});
	};

	//Get Single User Method
	const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${secret_key}`
		);
		dispatch({
			type: GET_USER,
			payload: res.data
		});
	};

	//Loading
	const setLoading = () => {
		dispatch({
			type: SET_LOADING
		});
	};

	//setAlert
	const showAlert = (msg, type) => {
		setAlert(msg,type);

		setTimeout(() => {
			dispatch({
				type:SHOW_ALERT
			});
		}, 3000); 
	};

    const setAlert=(msg,type)=>{
		dispatch({
			type:SET_ALERT,
			payload: { msg: msg ,
					   type: type
					}
		});
	}
	// get repositories
	const getRepos = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${secret_key}`
		);
		dispatch({
			type: GET_REPOS,
			payload : res.data
		})
	};


	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				alert:state.alert,
				searchUsers,
				allUsers,
				clearUsers,
				getUser,
				showAlert,
				getRepos
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GitHubState;
