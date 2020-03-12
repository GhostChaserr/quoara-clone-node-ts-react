import React, { useEffect } from 'react';
import { authenticate } from '../store/actions/authActions';
import { Redirect } from 'react-router-dom';

const withUser = (Component: any) => {
	return (props: any) => {
		// Get auth values from props
		const { loading, error, data } = props.auth;

		if (loading) {
			return <p> Loading! </p>;
		}

		if (data == null) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<Component user={data} {...props} />
			</div>
		);
	};
};

export default withUser;
