import { LOGIN, LOGIN_FAILED, LOGOUT, LOGIN_LOADING } from '../types/types';

const INITIAL_STATE = {
	loading: true,
	error: false,
	data: null
};

const authReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case LOGIN:
			return {
				loading: false,
				error: false,
				data: action.user
			};
		case LOGIN_LOADING:
			return {
				...state,
				loading: true
			};
		case LOGIN_FAILED:
			return {
				loading: false,
				error: action.error,
				data: null
			};
		case LOGOUT:
			return {
				loading: false,
				error: false,
				data: null
			};
		default:
			return state;
	}
};

export default authReducer;
