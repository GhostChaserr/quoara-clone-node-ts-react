import React, { useEffect } from 'react';
import { laodQuestions } from '../../store/actions/questionActionts';
import { connect } from 'react-redux';
import PostQuestion from '../../components/shared/PostQuestion';
import QuestionInteractionBox from '../../components/social/QuestionInteractionBox';
import QuestionAnswerBox from '../../components/social/QuestionAnswerBox';

const QuestionsScreen = (props: any) => {
	// Get data from state
	const { error, loading, data } = props.state;

	useEffect(() => {
		props.laodQuestions('hello');
	}, []);

	return (
		<div>
			<div>
				<PostQuestion />
			</div>
			{loading ? (
				<p> Loading! </p>
			) : (
				<div>
					{data.map((question: any) => (
						<div key={question._id}>
							<p> {question.question} </p>
							<p>{question.votes}</p>
							<p>{question.answers.length}</p>
							<QuestionInteractionBox questionId={question._id} />
							<QuestionAnswerBox questionId={question._id} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		state: state.questions
	};
};

export default connect(mapStateToProps, { laodQuestions })(QuestionsScreen);
