import React from 'react';
import QuestionForm from '../forms/QuestionForm';
import { connect } from 'react-redux';
import { postQuestion } from '../../store/actions/questionActionts';

export const PostQuestion = (props: any) => {
	// Render nothing if there is no user
	if (props.auth.data == null) return null;

	// Handle posting
	const handleSubmit = (data: any) => {
		// Post new question
		props.dispatch(postQuestion({ ...data }));
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

export default connect(mapStateToProps)(PostQuestion);
