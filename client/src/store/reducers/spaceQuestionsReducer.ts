import { LOAD_SPACE_QUESTIONS, SPACE_QUESTIONS_LOADING, LOAD_QUESTIONS_FAILED, LOAD_SPACE_QUESTIONS_FAILED } from "../types/types";



const INITIAL_STATE = {
  error: false,
  loading: false,
  data: []
}

const spaceQuestionsReducer = ((state = INITIAL_STATE, action:any) => {
  switch (action.type) {

    case SPACE_QUESTIONS_LOADING:
      return {
        loading: true,
        data: [],
        error: false
      }

    case LOAD_SPACE_QUESTIONS:
      return {
        loading: false,
        error: false,
        data: [...action.questions]
      }
    
    case LOAD_SPACE_QUESTIONS_FAILED:
      return {
        loading: false,
        error: action.error,
        data: []
      }
    default:
      return state;
  }
})

export default spaceQuestionsReducer;