import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//ContextAPI
import GithubState from './context/GitHub/GitHubState';
import NavBar from './components/layouts/NavBar';
import axios from 'axios';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from '../src/components/users/Search';
import Alert from '../src/components/layouts/Alert';
import About from './components/pages/About';
import './App.css';
const client_id = 'f88c36400a1e75d9e468';
const secret_key = '2d1bba9d9889b2c3175a0ed63843ebdc56cbcae8';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ alert, setAlert ] = useState(null);

	//get repos method
	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${secret_key}`
		);
		setRepos(res.data);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg: msg, type: type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<GithubState>
			<Router>
				<div className="App">
					<NavBar title="GitHub React App" />
					<div className="container">
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<Fragment>
										<Search setAlert={showAlert} />
										<Users />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />

							<Route
								exact
								path="/user/:login"
								render={(props) => <User {...props} repos={repos} getUserRepos={getUserRepos} />}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
