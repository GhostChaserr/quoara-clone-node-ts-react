import { LOAD_SPACES, LOAD_SPACES_FAILED, SPACES_LOADING, SPACE_QUESTIONS_LOADING, LOAD_SPACE_QUESTIONS, LOAD_SPACE_QUESTIONS_FAILED, SPACE_JOIN_FAILED, SPACE_JOIN_SUCCESS } from '../types/types';
import axios from 'axios';

// Epi endpoint
const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const loadSpaces = () => async (dispatch: any) => {

	dispatch({
		type: SPACES_LOADING
	})

	try {
		const response = await axios.get(`${apiEndpoint}/spaces`);
		const { error, data, status } = response.data.response;
	
		// Handle error response
		if (error !== null) {
			return dispatch({
				type: LOAD_SPACE_QUESTIONS_FAILED,
				error: error
			});
		}

		// Handle success response
		dispatch({
			type: LOAD_SPACES,
			spaces: data
		});

	} catch (error) {

		// Handle unexpected error
		dispatch({
			type: LOAD_SPACES_FAILED,
			error: "oops server is down"
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


export const joinSpace = (spaceId: string) => async (dispatch: any) => {
	try {

		const endpoint = `${apiEndpoint}/spaces/${spaceId}`
		const response = await axios.request({
			url: endpoint,
			method: 'POST',
			params:{
				action: 'join-space'
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { error, data, status } = response.data.response;

		// Error response
		if (error !== null) {
			return dispatch({
				type: SPACE_JOIN_FAILED,
				error: error
			});
		}

		// Success response
		dispatch({
			type: SPACE_JOIN_SUCCESS,
			data: {
				spaceId,
				member: data
			}
		})

	} catch (error) {

		// Server error
		dispatch({
			type: SPACE_JOIN_FAILED,
			error: 'oops server is down'
		});

	}
}