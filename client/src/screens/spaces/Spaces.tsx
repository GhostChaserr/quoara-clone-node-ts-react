import React, { useEffect } from 'react';
import { loadSpaces, joinSpace } from '../../store/actions/spaceActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import JoinLeaveButton from './JoinLeaveButton';


// Load components


const SpacesScreen = (props: any) => {

	const [loaded, setLoaded] = React.useState(false);

	// Fetch inital data for spaces
	useEffect(() => {
		if(props.state.data.length === 0){
			props.loadSpaces();
		}
	}, [props.state.data]);

	if(props.state.loading) return <p> Loading spaces! </p> 

	if(props.state.error) return <p>{props.state.error}</p>

	// Handle space join
	const handleSpaceJoin = (spaceId: string) => props.joinSpace(spaceId);

	return (
		<div>
			{props.state.data && props.state.data.map((space: any) => (
				<div key={space._id}>
					<div> {space.title} </div>
					<div>{space.description}</div>
					<p>{space.members.length}</p>
					<Link to={`/spaces/${space._id}`}>
						Explore
					</Link>
					<br/>
					<JoinLeaveButton 
						spaceId={space._id} 
					/>
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

export default connect(mapStateToProps, { loadSpaces, joinSpace })(SpacesScreen);
