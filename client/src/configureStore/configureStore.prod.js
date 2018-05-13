import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = preloadState => {
	const store = createStore(
		reducers,
		preloadState,
		compose(
			applyMiddleware(thunk)
		)
	);
	return store;
};

export default configureStore;