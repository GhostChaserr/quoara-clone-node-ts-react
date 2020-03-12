import React, { useEffect } from 'react';
import { loadSpaces } from '../../store/actions/spaceActions';
import { connect } from 'react-redux';

const SpacesScreen = (props: any) => {
	useEffect(() => {
		props.loadSpaces();
	}, []);

	return <div>Rendering spaces!</div>;
};

const mapStateToProps = (state: any) => {
	return {
		state: state.spaces
	};
};

export default connect(mapStateToProps, { loadSpaces })(SpacesScreen);
