import axios from 'axios';
import C from '../constants';

export const getCurrentProfile = () => dispatch => {
	dispatch({
		type: C.GET_CURRENT_PROFILE + C.START_LOAD,
	});
	axios.get('/api/profile')
		.then(({data}) => {
			dispatch({
				type: C.GET_CURRENT_PROFILE + C.FINISH_LOAD,
				payload: data,
			});
		}).catch(err => {
			dispatch({
				type: C.GET_ERRORS,
				payload: err.response.data,
			});

	})
};

export const clearCurrentProfile = () => ({
	type: C.CLEAR_PROFILE
});