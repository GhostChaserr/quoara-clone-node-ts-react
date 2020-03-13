import React from 'react';
import { connect } from 'react-redux';
import { upvoteQuestion } from '../../store/actions/questionActionts';

const QuestionInteractionBox = (props: any) => {
	// Render nothing if there is no user
	if (props.auth.data == null) return null;

	// Handle posting
	const handleUpvote = (data: any) => {
		// Post new question
		props.dispatch(upvoteQuestion(props.questionId));
	};
	return (
		<div>
			<button onClick={handleUpvote}> Upvote </button>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(QuestionInteractionBox);
