import React from 'react';
import { useForm } from 'react-hook-form';

const INITIAL_DATA = {
	name: 'george',
	lastName: 'batsiashvili',
	password: 'g2eorge123',
	email: 'nuca_kaxelo@gmail.com'
};

const RegisterForm = (props: any) => {
	// Deconstruct props
	const { credentials, processData } = props;

	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data: any) => {
		// Process data
		processData(data);

		// Reset form
		reset();
	};

	return (
		<form name="UserRegistrationForm" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<label htmlFor=""> Name </label>
				<input type="text" name="name" ref={register} />
			</div>
			<div className="form-group">
				<label> Last name </label>
				<input type="text" name="lastName" ref={register} />
			</div>
			<div className="form-group">
				<label> Email </label>
				<input type="email" name="email" ref={register} />
			</div>
			<div className="form-group">
				<label> Password </label>
				<input type="password" name="password" ref={register} />
			</div>
			<input type="submit" value="signup" />
		</form>
	);
};

RegisterForm.defaultProps = {
	processData: (credentials: any) => console.log(credentials),
	credentials: INITIAL_DATA
};

export default RegisterForm;
