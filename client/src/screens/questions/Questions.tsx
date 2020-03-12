import React, { useEffect } from 'react';
import { laodQuestions } from '../../store/actions/questionActionts';
import { connect } from 'react-redux';

const QuestionsScreen = (props: any) => {
	// Get data from state
	const { error, loading, data } = props.state;

	useEffect(() => {
		props.laodQuestions('hello');
	}, []);

	return (
		<div>
			{loading ? (
				<p> Loading! </p>
			) : (
				<div>
					{data.map((question: any) => (
						<div key={question._id}>
							<p> redering question </p>
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
