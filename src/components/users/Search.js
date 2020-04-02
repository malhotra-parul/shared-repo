import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/GitHub/githubContext';

const Search = ({ setAlert }) => {
	const [ text, setText ] = useState('');

	const githubContext = useContext(GithubContext);

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Enter github username ', 'danger');
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

Search.propTypes = {
	setAlert: PropTypes.func.isRequired
};

export default Search;
