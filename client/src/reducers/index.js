import {combineReducers} from 'redux';

import auth from './auth';
import errors from './errors';
import signIn from './signIn';
import userProfile from './userProfile';

export default combineReducers({
	auth,
	signIn,
	errors,
	userProfile,
})