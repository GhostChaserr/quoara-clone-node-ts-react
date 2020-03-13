import React from 'react';
import { useForm } from 'react-hook-form';

// Load actions

const INITIAL_DATA = {
	question: 'kitxva2',
	tags: [ 'development', 'marketing' ]
};

const QuestionAnswerForm = (props: any) => {
	// Deconstruct props
	const { processData } = props;

	const { register, handleSubmit } = useForm();
	const onSubmit = (data: any) => {
  
    processData(data);
		// Clear form
	};

	return (
		<form name="UserQuestion" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<textarea rows={5} name="question" ref={register} />
			</div>
			<input type="submit" value="leave answer" />
		</form>
	);
};

QuestionAnswerForm.defaultProps = {
	processData: (credentials: any) => console.log(credentials)
};

export default QuestionAnswerForm;
