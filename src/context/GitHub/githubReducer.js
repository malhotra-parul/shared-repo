import { SEARCH_USERS, GET_USER, CLEAR_USERS, SET_LOADING, GET_REPOS, ALL_USERS, SET_ALERT,SHOW_ALERT } from '../../types';

export default (state, action) => {
	switch (action.type) {
		case SEARCH_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};

		case ALL_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
        case SET_ALERT :
			return{
				...state,
				alert: action.payload
			}
		case SHOW_ALERT :
			return{
				...state,
				alert:null
			}
	    case GET_REPOS:
			return {
				...state,
				repos: action.payload,
				loading:false
			}
		default:
			return state;
	}
};
