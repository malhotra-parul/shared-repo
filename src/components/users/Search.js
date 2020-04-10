import React, { useState, useContext } from 'react';
import GithubContext from "../../context/Github/githubContext";

const Search = () => {
	const [ text, setText ] = useState('');
	const githubContext = useContext(GithubContext);
	const { users, searchUsers, clearUsers, showAlert } = githubContext;

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			showAlert('Enter github username ', 'danger');
		} else {
			searchUsers(text);
			setText('');
		}
	};
 
	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<input type="text" name="text" placeholder="Search for users..." value={text} onChange={onChange} />
				<input type="submit" value="Search" className="btn btn-dark btn-block" />
			</form>
			{users.length>0 && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
