import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import { login } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const Login = withRouter((props: any) => {
	const handleLogin = (credentials: any) => {
		// Start login process and pass history for redirects
		props.login(credentials, props.history);
	};

	return (
		<div>
			<div> Login screen! </div>
			<LoginForm processData={handleLogin} />
		</div>
	);
});

const mapStateToProps = (state: any) => {
	return {
		state: state.auth
	};
};

export default connect(mapStateToProps, { login })(Login);
