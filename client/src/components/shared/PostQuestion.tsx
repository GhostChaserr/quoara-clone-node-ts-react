import React from 'react';
import QuestionForm from '../forms/QuestionForm';
import { connect } from 'react-redux';
import { postQuestion } from '../../store/actions/questionActionts';

const PostQuestion = (props: any) => {

	// Render nothing if there is no user
	if (props.auth.data == null) return null;

	// Handle posting
	const handleSubmit = (data: any) => {


		const { action, dispatch, options } = props;

		// Post new question
		dispatch(action({ ...data, ...options }));

	};
	return (
		<div>
			<QuestionForm processData={handleSubmit} />
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		auth: state.auth
	};
};

PostQuestion.defaultProps = {
	action: postQuestion
}

export default connect(mapStateToProps)(PostQuestion);
