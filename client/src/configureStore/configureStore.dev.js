import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import DevTools from '../components/common/DevTools';

const configureStore = preloadState => {
	const store = createStore(
		reducers,
		preloadState,
		compose(
			applyMiddleware(thunk),
			DevTools.instrument()
		)
	);
	return store;
};

export default configureStore;