import { LOAD_SPACES, LOAD_QUESTIONS_FAILED, SPACES_LOADING } from '../types/types';

const INITIAL_STATE = {
	error: false,
	data: [],
	loading: false
};

const spacesReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case SPACES_LOADING:
			return {
				...state,
				loading: true
			}
		case LOAD_SPACES:
			return {
				...state,
				data: [ ...state.data, ...action.spaces ],
				error: false,
				loading: false
			};
		case LOAD_QUESTIONS_FAILED:
			return {
				...state,
				data: [],
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};

export default spacesReducer;
