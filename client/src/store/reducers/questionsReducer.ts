import { LOAD_QUESTIONS, LOAD_QUESTIONS_FAILED } from '../types/types';

const INITIAL_STATE = {
	error: false,
	data: [],
	loading: true
};

const questionsReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case LOAD_QUESTIONS:
			return {
				...state,
				data: [ ...action.questions ],
				loading: false
			};
		case LOAD_QUESTIONS_FAILED:
			return {
				...state,
				data: [],
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default questionsReducer;
