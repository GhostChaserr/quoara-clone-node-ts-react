import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withUser from '../../hoc/withUser';
import { loadUserQuestions } from '../../store/actions/questionActionts';
import { getUserPostedQuestions } from '../../store/filters/questionFilters';

export const Feed = (props: any) => {
	const { auth, questions, dispatch } = props;

	console.log(questions);

	useEffect(() => {
		// Load user questions
		dispatch(loadUserQuestions());
	}, []);

	if (questions.loading) {
		return <p> questions loading! </p>;
	}

	return (
		<div>
			{questions.data && questions.data.map((question: any) => <div key={question._id}>{question.question}</div>)}
		</div>
	);
};

const Authenticated = withUser(Feed);

const mapStateToProps = (state: any) => {
	return {
		auth: state.auth,
		questions: {
			loading: state.questions.loading,
			error: state.questions.error,
			data: getUserPostedQuestions({ questions: state.questions.data, user: state.auth.data })
		}
	};
};

export default connect(mapStateToProps)(Authenticated);
