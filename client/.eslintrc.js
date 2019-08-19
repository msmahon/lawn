module.exports = {
	extends: [
		'plugin:vue/recommended'
	],
	rules: {
		"no-console": "off",
		'vue/max-attributes-per-line': [2, {
			'singleline': 3,
			'multiline': {
				'max': 1,
				'allowFirstLine': false
			}
		}],
		"includeCommonJSModuleExports": true,
		"vue/multiline-html-element-content-newline": false,
		"vue/singleline-html-element-content-newline": false,
	},
	env: {
		"es6": true
	}
}