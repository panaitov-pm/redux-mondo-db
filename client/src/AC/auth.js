import axios from 'axios';
import jwt_decode from 'jwt-decode';

import C from '../constants';
import setAuthToken from '../utils/setAuthToken';

export const setCurrentUser = (user) => ({
	type: C.USER_SIGN_IN + C.FINISH_LOAD,
	payload: user,
});

export const signIn = (dataUser, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_IN + C.START_LOAD,
	});
	axios.post('/api/users/login', dataUser)
		.then(({data}) => {
			const {token} = data;
			localStorage.setItem('JwtToken', token);
			setAuthToken(token);
			const user = jwt_decode(token);
			dispatch(setCurrentUser(user));
			history.push('/dashboard');
		}).catch(err => {
			dispatch({
				type: C.GET_ERRORS,
				payload: err.response.data
			})
	});
};

export const signUp = (dataUser, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_UP + C.START_LOAD,
	});
	axios.post('api/users/register', dataUser)
		.then(() => {
			dispatch({
				type: C.USER_SIGN_UP + C.FINISH_LOAD
			});
			history.push('/sign-in');
		}).catch(err => {
			dispatch({
				type: C.GET_ERRORS,
				payload: err.response.data
			})
		});
};

export const signOut = () => dispatch => {
	localStorage.removeItem('JwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};