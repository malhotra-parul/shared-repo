import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinners from '../layouts/Spinner';

import GithubContext from '../../context/GitHub/githubContext';
const Users = () => {
	const githubContext = useContext(GithubContext);

	const { loading, users } = githubContext;

	if (loading) {
		return <Spinners />;
	} else {
		return <div style={userStyle}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>;
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem'
};

export default Users;
