const configureAPI = require('../server/configure')
require('dotenv').config();

module.exports = {
	devServer: {
		before: configureAPI
	}
}