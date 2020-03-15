import axios from 'axios';
// Load types
import {
	LOAD_QUESTIONS,
	LOAD_QUESTIONS_FAILED,
	POST_QUESTION_FAILED,
	POST_QUESTION,
	LOAD_USER_QUESTIONS_FAILED,
	LOAD_USER_QUESTIONS,
	LOAD_USER_QUESTIONS_STARTED,
	QUESTIONS_LOADING,
	UPVOTE_QUESTION,
	POST_ANSWER,
	UPVOTE_QUESTION_FAILED,
	POST_ANSWER_FAILED
} from '../types/types';

// Endpoint
const apiEndpoint: any = process.env.REACT_APP_ENDPOINT;

export const laodQuestions = (data: any) => async (dispatch: any) => {
	dispatch({
		type: QUESTIONS_LOADING
	});

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

export const postQuestion = (question: any) => async (dispatch: any) => {
	try {
		// Post new question
		const response = await axios.post(`${apiEndpoint}/questions`, question, {
			headers: { token: localStorage.getItem('token') }
		});

		const { data  } = response.data.response;

		dispatch({
			type: POST_QUESTION,
			question: data
		});
		

	} catch (err) {

		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: POST_QUESTION_FAILED,
				error: 'server is down'
				});
		}
		
		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: POST_QUESTION_FAILED,
			error: error
		});

	}
};

export const loadUserQuestions = () => async (dispatch: any) => {
	// Loading started
	dispatch({
		type: QUESTIONS_LOADING
	});

	try {
		const response = await axios.get(`${apiEndpoint}/me/questions`, {
			headers: { token: localStorage.getItem('token') }
		});

		const { data  } = response.data.response;

		dispatch({
			type: LOAD_USER_QUESTIONS,
			questions: data
		});

	} catch (err) {

		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: LOAD_USER_QUESTIONS_FAILED,
				error: 'server is down'
				});
		}
		
		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: LOAD_USER_QUESTIONS_FAILED,
			error: error
		});
	}

};

export const upvoteQuestion = (questionPayload: any) => async (dispatch: any) => {

	const { questionId } = questionPayload;

	console.log(questionId);

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
			type: UPVOTE_QUESTION,
			question: data
		});

	} catch (err) {

		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: UPVOTE_QUESTION_FAILED,
				error: 'server is down'
				});
		}
		
		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: UPVOTE_QUESTION_FAILED,
			error: error
		});

	}
};


export const postAnswer = (answerPayload: any) => async (dispatch: any) => {

	const { answer, questionId } = answerPayload;


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
			type: POST_ANSWER,
			question: data,
		})


	} catch (err) {
		
		// If error response is not available
		if(!err.response || !err.response.data) {
			return dispatch({
				type: POST_ANSWER_FAILED,
				error: 'server is down'
			});
		}

		// Deconstruct sent error
		const { error } = err.response.data.response;

		// Server error
		dispatch({
			type: POST_ANSWER_FAILED,
			error: error
		});
	};
	
}
