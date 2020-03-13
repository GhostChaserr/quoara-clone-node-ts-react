import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { LOGIN_FAILED, LOGIN, LOGOUT } from '../types/types';

const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const login = (credentials: any, history: any) => async (dispatch: any) => {
	try {
		// Retrive token
		const response = await axios.post(`${apiEndpoint}/authenticate`, credentials);
		const { error, data, status } = response.data.response;

		if (response.data.response.error) {
			return dispatch({
				type: LOGIN_FAILED,
				error: error
			});
		}

		// Extract token
		const token = data;

		// Save token into localstorage
		localStorage.setItem('token', token);

		// Authentcate
		await dispatch(authenticate());

		// Redirect user to feed
		history.push('/feed');
	} catch (error) {
		dispatch({
			type: LOGIN_FAILED,
			error: 'network failed'
		});
	}
};

export const register = (credentials: any, history: any) => async (dispatch: any) => {
	try {
		// Retrive token
		const response = await axios.post(`${apiEndpoint}/register`, credentials);
		const { error, data, status } = response.data.response;

		if (response.data.response.error) {
			return dispatch({
				type: LOGIN_FAILED,
				error: error
			});
		}

		// Extract token
		const token = data;

		// Save token into localstorage
		localStorage.setItem('token', token);

		// Authentcate
		await dispatch(authenticate());

		// Redirect user to feed
		history.push('/feed');
	} catch (error) {
		dispatch({
			type: LOGIN_FAILED,
			error: error
		});
	}
};

export const authenticate = () => async (dispatch: any) => {
	try {
		const user = await axios.get(`${apiEndpoint}/me`, { headers: { token: localStorage.getItem('token') } });
		dispatch({
			type: LOGIN,
			error: false,
			user: user.data.response.data
		});
	} catch (error) {
		// Delete token anyway
		localStorage.removeItem('token');

		// Update auth error state
		dispatch({
			type: LOGIN_FAILED,
			error: true,
			data: null
		});
	}
};

export const logout = () => (dispatch: any) => {
	// Clear store
	dispatch({
		type: LOGOUT
	});

	// Delete token
	localStorage.removeItem('token');
};

export default login;
