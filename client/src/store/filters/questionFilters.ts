interface QuestionsFilter {
	questions: [];
	user: {};
}

export const getUserPostedQuestions = (args: QuestionsFilter) => {
	const { user, questions }: any = args;
	return questions.filter((question: any) => question.user.user == user['_id']);
};
