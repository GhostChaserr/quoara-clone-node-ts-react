import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import { loadSpaceQuestions } from '../../store/actions/spaceActions';

export const SpaceDetailScreen = (props: any) => {

  useEffect(() => {
    if(props.space){
      props.dispatch(loadSpaceQuestions(props.space._id))
    } 
  },[]);

  // Redirect if space was not found
  if(!props.space) return <Redirect to="/spaces"/>

  return (
    <div>
      <div>{props.space.title}</div>
      <div>
        {props.questions.data.length !== 0 && props.questions.data.map((question: any) => {
          return (
            <div key={question._id}>
              <p>{question.question}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any, props: any) => {

  // Query given space and return to component
  const spaceId = props.match.params.id;
  const currentSpace = state.spaces.data.find((space: any) => space._id == spaceId);
  return {
    ...props,
    space: currentSpace,
    questions: state.spaceQuestions
  }
}

export default withRouter(connect(mapStateToProps)(SpaceDetailScreen));
