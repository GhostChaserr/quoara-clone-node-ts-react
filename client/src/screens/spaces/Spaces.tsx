import React, { useEffect } from 'react';
import { loadSpaces } from '../../store/actions/spaceActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const SpacesScreen = (props: any) => {

	const [loaded, setLoaded] = React.useState(false);

	// Fetch inital data for spaces
	useEffect(() => {
		if(props.state.data.length === 0){
			props.loadSpaces();
		}
	}, [props.state.data]);

	if(props.state.loading) return <p> Loading spaces! </p> 

	return (
		<div>
			{props.state.data && props.state.data.map((space: any) => (
				<div key={space._id}>
					<div> {space.title} </div>
					<div>{space.description}</div>
					<Link to={`/spaces/${space._id}`}>
						Explore
					</Link>
				</div>
			))}
		</div>
	)
};

const mapStateToProps = (state: any) => {
	return {
		state: state.spaces
	};
};

export default connect(mapStateToProps, { loadSpaces })(SpacesScreen);
