import { LOAD_SPACES, LOAD_SPACES_FAILED, SPACES_LOADING, SPACE_QUESTIONS_LOADING, LOAD_SPACE_QUESTIONS, LOAD_SPACE_QUESTIONS_FAILED } from '../types/types';
import axios from 'axios';

// Epi endpoint
const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const loadSpaces = () => async (dispatch: any) => {

	dispatch({
		type: SPACES_LOADING
	})

	try {
		const response = await axios.get(`${apiEndpoint}/spaces`);
		dispatch({
			type: LOAD_SPACES,
			spaces: response.data.data
		});
	} catch (error) {
		dispatch({
			type: LOAD_SPACES_FAILED,
			error: error
		});
	}
};




export const loadSpaceQuestions = (spaceId: string) => async (dispatch: any) => {

	// Start loading space questions
	dispatch({ type: SPACE_QUESTIONS_LOADING })

	try {

		// Query space questions
		const response = await axios.get(`${apiEndpoint}/spaces/${spaceId}/questions`);
		const { error, data, status } = response.data.response;

		// Handle Response Error
		if (response.data.response.error) {
			return dispatch({
				type: LOAD_SPACE_QUESTIONS_FAILED,
				error: error
			});
		}

		// Fill space questions store
		dispatch({
			type: LOAD_SPACE_QUESTIONS,
			questions: data
		});

	} catch (error) {

		// Handle other network errors
		dispatch({
			type: LOAD_SPACE_QUESTIONS_FAILED,
			error: error
		});
		
	}
} 