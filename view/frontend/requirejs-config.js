var config = {
	map: {
		'*': {
			'mageziner/peekaboo': 'Gil_Mageziner/js/peekaboo-toggle.jquery',
			'mageziner/select2': 'Gil_Mageziner/js/select2.min',
			'webfont': '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
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
