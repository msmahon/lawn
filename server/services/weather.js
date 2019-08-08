const https = require('https')
const axios = require('axios')

module.exports = class Query {
	constructor() {
		let endpoint =  `https://api.openweathermap.org/data/2.5/forecast?zip=29607&appid=${process.env.WEATHER_API_KEY}`
		
	}

	getWeather() {
		
	}
};