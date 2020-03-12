import { combineReducers } from 'redux';

// Load reducers
import questionsReducer from './questionsReducer';
import spacesReducer from './spacesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	questions: questionsReducer,
	spaces: spacesReducer,
	auth: authReducer
});

export default rootReducer;
