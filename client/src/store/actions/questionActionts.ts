import axios from 'axios';
// Load types
import { LOAD_QUESTIONS, LOAD_QUESTIONS_FAILED } from '../types/types';

// Endpoint
const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const laodQuestions = (data: any) => async (dispatch: any) => {
	console.log(data);
	try {
		const response = await axios.get(`${apiEndpoint}/questions`);
		dispatch({
			type: LOAD_QUESTIONS,
			questions: response.data.data
		});
	} catch (error) {
		dispatch({
			type: LOAD_QUESTIONS_FAILED,
			questions: [],
			error: error
		});
	}
};
