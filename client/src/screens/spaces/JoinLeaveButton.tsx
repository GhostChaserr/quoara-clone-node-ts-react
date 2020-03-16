import React from "react";
import { connect } from "react-redux";
import { joinSpace, leaveSpace } from "../../store/actions/spaceActions";


const JoinLeaveButton = (props: any) => {

  // Dont render if user is not available;
  if(!props.userId) return null;

  // Toggles between join and leave
  const toggleJoinLeave = () => {
    const { isMember, spaceId, leaveSpace, joinSpace } = props;
    isMember ? 
      leaveSpace(spaceId) :
      joinSpace(spaceId)
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={toggleJoinLeave} style={{ padding: "10px" }} >
        {props.isMember === true ? 'leave' : 'join'}
      </button>
    </div>
  );
}

const mapStateToProps = (state: any, props: any) => {

  console.log(props);

  // Query given space
  const { spaceId } = props;
  const space = state.spaces.data.find((space: any) => space._id == spaceId);

  console.log(space);

  // Query logged in user and check if member
  const userId = state.auth.data !== null && state.auth.data._id || undefined;
  let isMember = undefined;

  if(userId){
    isMember = space.members.some((member: any) => member.user == userId);
  }

  return {
    isMember,
    spaceId,
    userId
  }

}

JoinLeaveButton.defaultProps = {
  button: 'join'
}

export default connect(mapStateToProps, { leaveSpace, joinSpace })(JoinLeaveButton);
