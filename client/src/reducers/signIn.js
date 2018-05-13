import C from '../constants';

const defaultState = {
	isLoading: false,
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.USER_SIGN_IN + C.START_LOAD:
			return {...state, isLoading: true};
		case C.USER_SIGN_IN + C.FINISH_LOAD:
		case C.GET_ERRORS:
			return {...state, isLoading: false};
		default:
			return state;
	}
};
