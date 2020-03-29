import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null
	};

	async componentDidMount() {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/users?client_id=${client_id}&client_secret=${secret_key}`);

		this.setState({
			users: res.data,
			loading: false
		});
	}

	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${client_id}&client_secret=${secret_key}`
		);

		this.setState({
			loading: false,
			users: res.data.items
		});
	};

	//Get Single User Method
	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${client_id}&client_secret=${secret_key}`
		);
		this.setState({ user: res.data, loading: false });
	};

	//get repos method
	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${secret_key}`
        );
        this.setState({repos : res.data, loading : false});
	};

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false
		});
	};

	setAlert = (msg, type) => {
		this.setState({
			alert: {
				msg: msg,
				type: type
			}
		});

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	render() {
		return (
			<Router>
				<div className="App">
					<NavBar title="GitHub React App" />
					<div className="container">
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 1 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={this.state.loading} users={this.state.users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />

							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User
										{...props}
										user={this.state.user}
                                        getUser={this.getUser}
                                        repos={this.state.repos}
                                        getUserRepos={this.getUserRepos}
										loading={this.state.loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
