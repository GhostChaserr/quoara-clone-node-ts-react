import React, { useEffect } from 'react';
import { authenticate } from '../store/actions/authActions';

const withUser = (Component: any) => {
	return (props: any) => {
		// Get auth values from props
		const { loading, error, data } = props.auth;

		useEffect(() => {
			props.dispatch(authenticate());
		}, []);

		if (loading) {
			return <p> Loading! </p>;
		}
		return (
			<div>
				<Component user={data} {...props} />
			</div>
		);
	};
};

export default withUser;
