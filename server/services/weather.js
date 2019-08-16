const https = require('https')
const axios = require('axios')

module.exports = class Query {
	constructor() {
		this.endpoint =  `https://api.openweathermap.org/data/2.5/forecast?zip=29607&appid=${process.env.WEATHER_API_KEY}`
	}

	async getForecast() {
		let forecast = await axios.get(this.endpoint)
		return forecast
	}
};