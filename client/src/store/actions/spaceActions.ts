import { LOAD_SPACES, LOAD_SPACES_FAILED, SPACES_LOADING, SPACE_QUESTIONS_LOADING, LOAD_SPACE_QUESTIONS, LOAD_SPACE_QUESTIONS_FAILED, SPACE_JOIN_FAILED, SPACE_JOIN_SUCCESS, POST_SPACE_QUESTION, POST_SPACE_QUESTION_FAILED, UPVOTE_SPACE_QUESTION, UPVOTE_SPACE_QUESTION_FAILED, POST_SPACE_QUESTION_ANSWER, POST_SPACE_QUESTION_ANSWER_FAILED, LEAVE_SPACE, LEAVE_SPACE_FAILED } from '../types/types';
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
		const { data } = response.data.response;

		// Fill space questions store
		dispatch({
			type: LOAD_SPACE_QUESTIONS,
			questions: data
		});

	} catch (err) {

		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: LOAD_SPACE_QUESTIONS_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
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

		const { data } = response.data.response;

		// Success response
		dispatch({
			type: SPACE_JOIN_SUCCESS,
			data: {
				spaceId,
				member: data
			}
		})



	} catch (err) {
		
		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: SPACE_JOIN_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: SPACE_JOIN_FAILED,
			error: error
		});

	}
}

export const postSpaceQuestion = (questionPayload: any) => async (dispatch: any) => {
	
	const { spaceId, question, tags } = questionPayload;

	try {

		const endpoint = `${apiEndpoint}/spaces/${spaceId}`;

		const response = await axios.request({
			url: endpoint,
			method: 'POST',
			params:{
				action: 'post-question'
			},
			data:{
				question: question,
				tags: tags
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { data } = response.data.response;

		dispatch({
			type: POST_SPACE_QUESTION,
			question: data
		});

	} catch (err) {

		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: POST_SPACE_QUESTION_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: POST_SPACE_QUESTION_FAILED,
			error: error
		});
	}

}

export const upvoteSpaceQuestion = (questionPayload: any) => async (dispatch: any) => {

	const { questionId } = questionPayload;

	try {

		const response = await axios.request({
			url: `${apiEndpoint}/questions/${questionId}`,
			method: 'POST',
			params:{
				action: 'upvote-question'
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { data  } = response.data.response;

		// Send upvoted question to the store
		dispatch({
			type: UPVOTE_SPACE_QUESTION,
			question: data
		});
		
	} catch (err) {

		if(!err.response || !err.response.data) {
			return dispatch({
				type: UPVOTE_SPACE_QUESTION_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: UPVOTE_SPACE_QUESTION_FAILED,
			error: error
		});

	}
}

export const postSpaceQuestionAnswer = (answerPayload: any) => async (dispatch: any) => {
	const { questionId, answer } = answerPayload;

	try {

		const response = await axios.request({
			url: `${apiEndpoint}/questions/${questionId}`,
			method: 'POST',
			params:{
				action: 'answer-question'
			},
			data: {
				answer: answer
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { data } = response.data.response;

		dispatch({
			type: POST_SPACE_QUESTION_ANSWER,
			question: data
		})


	} catch (err) {
		
		if(!err.response || !err.response.data) {
			return dispatch({
				type: POST_SPACE_QUESTION_ANSWER_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: POST_SPACE_QUESTION_ANSWER_FAILED,
			error: error
		});

	}

	console.log(questionId, answer);
}

export const leaveSpace = (spaceId: string) => async (dispatch: any) => {
	try {

		const endpoint = `${apiEndpoint}/spaces/${spaceId}`;

		const response = await axios.request({
			url: endpoint,
			method: 'POST',
			params:{
				action: 'leave-space'
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { data } = response.data.response;
		dispatch({
			type: LEAVE_SPACE,
			data: {
				spaceId: spaceId,
				member: data
			}
		});
		
	} catch (error) {
		dispatch({
			type: LEAVE_SPACE_FAILED,
			error: "failed"
		});
	}
}