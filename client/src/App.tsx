import React from 'react';

// Load router
import { BrowserRouter as Router, Route, Switch, BrowserRouter, NavLink, Link } from 'react-router-dom';

// Load screens
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import Feed from './screens/auth/Feed';

// Load components
import Layout from './components/Layout';

const Navigation = () => (
	<React.Fragment>
		<Link to="/feed">Feed</Link>
		<Link to="/register">Register</Link>
		<Link to="/login">login</Link>
	</React.Fragment>
);

function App() {
	return (
		<div className="App">
			<Layout>
				<BrowserRouter>
					<Navigation />
					<Switch>
						<Route path="/feed">
							<Feed />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
					</Switch>
				</BrowserRouter>
			</Layout>
		</div>
	);
}

export default App;
