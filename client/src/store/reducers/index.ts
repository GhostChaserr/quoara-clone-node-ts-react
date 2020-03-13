import { combineReducers } from 'redux';

// Load reducers
import questionsReducer from './questionsReducer';
import spacesReducer from './spacesReducer';
import authReducer from './authReducer';
import spaceQuestionsReducer from './spaceQuestionsReducer';


const rootReducer = combineReducers({
	questions: questionsReducer,
	spaces: spacesReducer,
	auth: authReducer,
	spaceQuestions: spaceQuestionsReducer
});

export default rootReducer;
