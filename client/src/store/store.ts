import { createStore, applyMiddleware } from 'redux';

// Load root reducer
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const saveToLocalStorage = (state: any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (error) {
		console.log(error);
	}
};

const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return undefined;
		return JSON.parse(serializedState);
	} catch (error) {
		console.log(error);
	}
};

// Load state from local storage
const persistedState = loadFromLocalStorage();

// Initialzie store
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

store.subscribe(() => {
	// Everytime state updates save to local storage
});

export default store;
