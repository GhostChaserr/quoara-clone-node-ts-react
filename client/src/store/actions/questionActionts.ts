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
	POST_ANSWER
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

		const { error, data, status } = response.data.response;

		// Handle error
		if (response.data.response.error) {
			return dispatch({
				type: POST_QUESTION_FAILED,
				error: error
			});
		}
		dispatch({
			type: POST_QUESTION,
			question: data
		});
	} catch (error) {
		return dispatch({
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

		const { error, data, status } = response.data.response;
		if (response.data.response.error) {
			return dispatch({
				type: LOAD_USER_QUESTIONS_FAILED,
				error: error
			});
		}

		dispatch({
			type: LOAD_USER_QUESTIONS,
			questions: data
		});
	} catch (error) {
		console.log(error);
	}
	// http://localhost:4000/api/v1/me/questions
};

export const upvoteQuestion = (questionId: string) => async (dispatch: any) => {
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
		const { error, data, status } = response.data.response;

		// Send upvoted question to the store
		dispatch({
			type: UPVOTE_QUESTION,
			question: data
		});

	} catch (error) {
		console.log(error);

		debugger;
	}
};


export const postAnswer = (answerPayload: any) => async (dispatch: any) => {

	const { answer, questionId } = answerPayload;

	const jsonData = JSON.stringify({ answer: answer });

	try {

		const response = await axios.request({
			url: `${apiEndpoint}/questions/${questionId}`,
			method: 'POST',
			params:{
				action: 'answer-question'
			},
			data: {
				answer: "kitxvaze-pasuxi"
			},
			headers:{
				token: localStorage.getItem('token')
			}
		});

		const { error, data, status } = response.data.response;
		
		dispatch({
			type: POST_ANSWER,
			question: data,
		})


	} catch (error) {
		console.log(error);
	}
}
