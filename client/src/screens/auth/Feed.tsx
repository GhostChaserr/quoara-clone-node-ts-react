import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withUser from '../../hoc/withUser';

export const Feed = (props: any) => {
	useEffect(() => {
		console.log(props.user);
	}, []);

	return <div>Welcome - {props.user.name}</div>;
};

const Authenticated = withUser(Feed);

const mapStateToProps = (state: any) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Authenticated);
