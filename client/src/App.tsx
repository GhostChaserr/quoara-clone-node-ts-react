import React from 'react';
import { Provider } from 'react-redux';

// Load router
import { BrowserRouter as Router, Route, Switch, BrowserRouter, NavLink, Link } from 'react-router-dom';

// Load screens
import Login from './screens/auth/Login';
import Feed from './screens/auth/Feed';
import Questions from './screens/questions/Questions';
import Spaces from './screens/spaces/Spaces';

// Load components
import Layout from './components/Layout';

// Store
import store from './store/store';
import Signup from './screens/auth/Signup';
import { authenticate, logout } from './store/actions/authActions';
import SpaceDetailScreen from './screens/spaces/SpaceDetail';

const Navigation = () => (
	<React.Fragment>
		<Link to="/feed">Feed</Link>
		<Link to="/register">Register</Link>
		<Link to="/login">login</Link>
		<Link to="/questions">questions</Link>
		<Link to="/spaces">questions</Link>
		<Link
			to="#"
			onClick={() => {
				store.dispatch(logout());
			}}
		>
			Logout
		</Link>
	</React.Fragment>
);

// Prepare store

const currentSate = store.getState();
if (currentSate.auth.data === null) {
	store.dispatch(authenticate());
}

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Layout>
					<BrowserRouter>
						<Navigation />
						<Switch>
							<Route path="/questions">
								<Questions />
							</Route>
							<Route exact={true} path="/spaces">
								<Spaces />
							</Route>
							<Route path="/spaces/:id">
								<SpaceDetailScreen/>
							</Route>
							<Route path="/feed">
								<Feed />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<Route path="/register">
								<Signup />
							</Route>
						</Switch>
					</BrowserRouter>
				</Layout>
			</Provider>
		</div>
	);
}

export default App;
