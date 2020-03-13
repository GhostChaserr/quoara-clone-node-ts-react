import React from 'react';
import QuestionForm from '../forms/QuestionForm';
import { connect } from 'react-redux';
import { postQuestion, postAnswer } from '../../store/actions/questionActionts';
import QuestionAnswerForm from '../forms/QuestionAnswerForm';

const QuestionAnswerBox = (props: any) => {
	// Render nothing if there is no user
	if (props.auth.data == null) return null;

	// Handle posting
	const handleSubmit = (data: any) => {

		props.dispatch(postAnswer({
			answer: data.question,
			questionId: props.questionId
		}));


	};
	return (
		<div>
			<QuestionAnswerForm processData={handleSubmit}/>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(QuestionAnswerBox);
