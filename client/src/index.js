import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './components/common/Root';
import configureStore from './configureStore';
import jwt_decode from 'jwt-decode';

import {setCurrentUser} from './AC/auth';
import setAuthToken from './utils/setAuthToken';

const store = configureStore();

if(localStorage.JwtToken) {
	const token = localStorage.JwtToken;
	const user = jwt_decode(token);
	const currTime = Date.now() / 1000;
	setAuthToken(token);
	store.dispatch(setCurrentUser(user));

	if(user.exp < currTime) {
		setAuthToken(false);
		store.dispatch(setCurrentUser({}));
		window.location.href = '/sign-in';
	}
}

ReactDOM.render(
	<BrowserRouter>
		<Root store={store} />
	</BrowserRouter>,
	document.getElementById('root'));
