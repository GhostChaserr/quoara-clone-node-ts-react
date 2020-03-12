import React from 'react';
import RegisterForm from '../../components/forms/RegisterForm';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

export const Signup = withRouter((props: any) => {
	const handleSignup = (credentials: any) => {
		props.register(credentials, props.history);
	};

	return (
		<div>
			<RegisterForm processData={handleSignup} />
		</div>
	);
});

const mapStateToProps = (state: any) => {
	return {
		state: state.auth
	};
};

export default connect(mapStateToProps, { register })(Signup);
