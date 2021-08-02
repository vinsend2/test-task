const initialState = {
	imgs: [],
	loading: false,
	groups: false,
	delay: false
};

const reducer = (
	state = initialState,
	action: { type: any; payload: any }
) => {
	switch (action.type) {
		case 'SET_IMGS':
			return Object.assign({}, state, {
				imgs: action.payload,
			});
		case 'SET_GROUPS':
			return Object.assign({}, state, {
				groups: action.payload,
			});
		case 'SET_LOADING':
			return {
                ...state,
                loading: action.payload             
            };	
		case 'SET_DELAY':
			return {
                ...state,
                delay: action.payload             
            };	
		default:
			return state;
	}
};

export default reducer;