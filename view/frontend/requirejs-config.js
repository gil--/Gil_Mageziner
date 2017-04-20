var config = {
	map: {
		'*': {
			'mageziner/peekaboo': 'Gil_Mageziner/js/peekaboo-toggle.jquery',
			'mageziner/select2': 'Gil_Mageziner/js/select2.min',
		},
	},
	shim: {
		'mageziner/peekaboo': {
			deps: ['jquery']
		},
		'mageziner/select2': {
			deps: ['jquery']
		},
	}
};
