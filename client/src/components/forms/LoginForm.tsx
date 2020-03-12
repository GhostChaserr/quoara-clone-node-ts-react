import React from 'react';
import { useForm } from 'react-hook-form';

// Load actions

const INITIAL_DATA = {
	password: 'g2eorge123',
	email: 'nuca_kaxelo@gmail.com'
};

const LoginForm = (props: any) => {
	// Deconstruct props
	const { credentials, processData } = props;

	const { register, handleSubmit } = useForm();
	const onSubmit = (data: any) => {
		processData(data);

		// Clear form
	};

	return (
		<form name="UserLoginForm" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<input type="email" name="email" ref={register} />
			</div>
			<div className="form-group">
				<input type="password" name="password" ref={register} />
			</div>
			<input type="submit" value="login" />
		</form>
	);
};

LoginForm.defaultProps = {
	processData: (credentials: any) => console.log(credentials),
	credentials: INITIAL_DATA
};

export default LoginForm;
