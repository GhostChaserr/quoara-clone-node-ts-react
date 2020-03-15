import _ from 'lodash';

import {
	LOAD_QUESTIONS,
	LOAD_QUESTIONS_FAILED,
	POST_QUESTION,
	POST_QUESTION_FAILED,
	LOAD_USER_QUESTIONS,
	LOAD_USER_QUESTIONS_FAILED,
	LOAD_USER_QUESTIONS_STARTED,
	QUESTIONS_LOADING,
	UPVOTE_QUESTION,
	POST_ANSWER,
	POST_ANSWER_FAILED
} from '../types/types';
import e from 'express';

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
		case POST_QUESTION:
			return {
				...state,
				data: [ ...state.data, action.question ],
				loading: false
			};
		case POST_QUESTION_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			}
		case QUESTIONS_LOADING:
			return {
				...state,
				loading: true
			};
		case LOAD_USER_QUESTIONS:
			// Clean questions by removing dubliates
			const withDublicates = state.data.concat(action.questions);
			const cleanData = _.uniqBy(withDublicates, '_id');
			return {
				...state,
				data: [ ...cleanData ],
				loading: false
			};

		case LOAD_USER_QUESTIONS_FAILED:
			return {
				...state,
				data: [ ...state.data ],
				loading: false,
				error: action.error
			};
		case UPVOTE_QUESTION:
			const updated = state.data.map((question: any) => {
				if(question._id == action.question._id){
					return {
						...action.question
					}
				}else{
					return  {
						...question
					}
				}
			})

			return {
				...state,
				data: updated,
			}
		
		case POST_ANSWER:
			return {
				...state,
				data: state.data.map((question: any) => {
					if(question._id == action.question._id){
						 return {
							 ...action.question
						 }
					}else{
						 return {
							 ...question
						 }
					}
				})
			}
			
		case POST_ANSWER_FAILED:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

export default questionsReducer;
