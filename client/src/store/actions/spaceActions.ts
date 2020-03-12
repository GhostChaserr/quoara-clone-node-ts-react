import { LOAD_SPACES, LOAD_SPACES_FAILED } from '../types/types';
import axios from 'axios';

// Epi endpoint
const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const loadSpaces = () => async (dispatch: any) => {
	try {
		const response = await axios.get(`${apiEndpoint}/spaces`);
		console.log(response);
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
