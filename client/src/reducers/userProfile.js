import C from '../constants';

const defaultState = {
	profile  : null,
	profiles : [],
	isLoading: false
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.GET_CURRENT_PROFILE + C.START_LOAD:
			return {...state, isLoading: true};
		case C.GET_CURRENT_PROFILE + C.FINISH_LOAD:
			return {...state, isLoading: false, profile: payload};
		case C.CLEAR_PROFILE:
			return {...state, profile: null};
		default:
			return state;
	}
}