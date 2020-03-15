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

		const { action, questionId, dispatch  } = props;

		dispatch(action({
			answer: data.question,
			questionId: questionId
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

QuestionAnswerBox.defaultProps = {
	action: postAnswer,
	actionId: ""
}

export default connect(mapStateToProps)(QuestionAnswerBox);
