import React, { useState, useContext } from 'react';
import GithubContext from "../../context/Github/githubContext";
import PropTypes from 'prop-types';

const Search = ({ clearUsers, showClear, setAlert }) => {
	const [ text, setText ] = useState('');
	const githubContext = useContext(GithubContext);
	const { searchUsers } = githubContext;

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Enter github username ', 'danger');
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
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
};

export default Search;
