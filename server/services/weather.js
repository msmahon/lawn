const https = require('https')
const axios = require('axios')

module.exports = class Query {
	constructor() {
		this.endpoint =  `https://api.openweathermap.org/data/2.5/forecast?zip=29607&appid=${process.env.WEATHER_API_KEY}`
	}

	async getForecast() {
		let forecast = await axios.get(this.endpoint)
		let trimmedForecast = []

		
		forecast.data.list.forEach(day => {
			while (trimmedForecast.length < 5) {
				trimmedForecast.push({
					min: day.main.temp_min,
					max: day.main.temp_max,
					description: day.weather[0].main
				})
			}
		});

		return trimmedForecast
	}
};