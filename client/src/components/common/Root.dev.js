import React, {Fragment} from 'react';
import DevTools from './DevTools';
import {Provider} from 'react-redux';
import App from '../App';

const Root = ({store}) => (
	<Provider store={store}>
		<div>
			<App />
			<DevTools />
		</div>
	</Provider>
);

export default Root;