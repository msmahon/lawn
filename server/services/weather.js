const https = require('https');

module.exports = class Query {
	constructor() {
		let endpoint =  `https://api.openweathermap.org/data/2.5/forecast?zip=29607&appid=${process.env.WEATHER_API_KEY}`
		https.get(endpoint, (resp) => {
			let data = ''

			resp.on('data', (chunk) => {
				data += chunk
			})

			resp.on('end', () => {
				console.log(JSON.parse(data))
			})
		})
	}

	getWeather() {
		
	}
};