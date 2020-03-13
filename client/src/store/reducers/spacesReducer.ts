import { LOAD_SPACES, LOAD_QUESTIONS_FAILED, SPACES_LOADING, LOAD_SPACES_FAILED, SPACE_JOIN_SUCCESS } from '../types/types';

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
		case LOAD_SPACES_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			}
		case SPACE_JOIN_SUCCESS:
			return {
				...state,
				loading: false,
				data: state.data.map((space: any) => {
					if(space._id === action.data.spaceId) {
						return {
							...space,
							members: [...space.members, action.data.member]
						}
					}else{
						return space
					}
				})
			}
			
		default:
			return state;
	}
};

export default spacesReducer;
