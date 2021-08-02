export const Actions = {
	setImgs: (imgs: []) => {
		return {
			type: 'SET_IMGS',
			payload: imgs,
		};
	},
	setGroups: (groups: boolean) => {
		return {
			type: 'SET_GROUPS',
			payload: groups,
		};
	},
	setLoading: (loading: boolean) => {
		return {
			type: 'SET_LOADING',
			payload: loading,
		};
	},
	setDelay: (delay: boolean) => {
		return {
			type:'SET_DELAY',
			payload: delay,
		};
	},
};

