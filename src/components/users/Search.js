import React, { useState, useContext } from 'react';
import GithubContext from '../../context/GitHub/githubContext';

const Search = () => {
	const [ text, setText ] = useState('');

	const githubContext = useContext(GithubContext);

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			githubContext.showAlert('Enter github username ', 'danger');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<input type="text" name="text" placeholder="Search for users..." value={text} onChange={onChange} />
				<input type="submit" value="Search" className="btn btn-dark btn-block" />
			</form>
			{githubContext.users.length > 0 && (
				<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};


export default Search;
