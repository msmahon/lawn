const Database = require('better-sqlite3')

module.exports = class Query {
	constructor(database) {
		this.db = Database(database, {verbose: console.log})
	}

	randomLawnConfiguration() {
		let data = []
		let metaData = {}
		const healthOptions = ['good', 'fair', 'dead']
		const conditionOptions = ['clover', 'weeds']

		let maxWidth = 12
		let maxHeight = 6
		let minWidth = 8
		let minHeight = 3
		let width = this.randomNum(maxWidth)
		let height = this.randomNum(maxHeight)

		while (width < minWidth) { width = this.randomNum(maxWidth) }
		while (height < minHeight) { height = this.randomNum(maxHeight) }

		metaData.columns = width

		for (let i = 0; i < width * height; i++) {
			let cond = [];
			switch (this.randomNum(2)) {
				case 0:
					break
				case 1:
					cond.push(conditionOptions[this.randomNum(1)])
					break
				case 2:
					cond = conditionOptions
					break

			}
			data.push({ id: i, health: healthOptions[this.randomNum(2)], conditions: cond })
		}
		return {data,metaData}
	}

	randomNum(max) { return Math.round(Math.random()*max,0) }

	resetDatabase() {
		let drop = "DROP TABLE IF EXISTS lawns;"
		let createLawnTable = "CREATE TABLE lawns (name TEXT, data TEXT, zip INTEGER, grass_type_id INTEGER);"

		this.db.prepare(drop).run()
		this.db.prepare(createLawnTable).run()

		let lawn1 = this.randomLawnConfiguration()
		let lawn2 = this.randomLawnConfiguration()

		this.addLawn('test1', JSON.stringify(lawn1), 29601, this.randomNum(10))
		this.addLawn('test2', JSON.stringify(lawn2), 97008, this.randomNum(10))
		// this.addLawn('test',JSON.stringify(
		// 	{
		// 		data: [
		// 			{id: 1, health: 'good', conditions: []},
		// 			{id: 2, health: 'good', conditions: []},
		// 			{id: 3, health: 'good', conditions: []},
		// 			{id: 4, health: 'good', conditions: []},
		// 			{id: 5, health: 'good', conditions: []},
		// 			{id: 6, health: 'good', conditions: []},
		// 			{id: 7, health: 'good', conditions: []},
		// 			{id: 8, health: 'good', conditions: []},
		// 			{id: 9, health: 'good', conditions: []},
		// 			{id: 10, health: 'good', conditions: []},
		// 			{id: 11, health: 'good', conditions: []},
		// 			{id: 12, health: 'good', conditions: []}
		// 		],
		// 		metaData: {
		// 			columns: 4
		// 		}
		// 	}
		// ))

		// this.addLawn('test2',JSON.stringify(
		// 	{
		// 		data: [
		// 			{id: 1, health: 'good', conditions: []},
		// 			{id: 2, health: 'good', conditions: []},
		// 			{id: 3, health: 'good', conditions: []},
		// 			{id: 4, health: 'good', conditions: []},
		// 			{id: 5, health: 'good', conditions: []},
		// 			{id: 6, health: 'good', conditions: []},
		// 			{id: 7, health: 'good', conditions: []},
		// 			{id: 8, health: 'good', conditions: []}
		// 		],
		// 		metaData: {
		// 			columns: 4
		// 		}
		// 	}
		// ))

		this.createGrassTable()
	}

	createGrassTable() {
		let drop = "DROP TABLE IF EXISTS grass_types;"
		let createGrassTable = `CREATE TABLE grass_types (
			name TEXT UNIQUE,
			blade TEXT,
			color TEXT,
			texture TEXT,
			growth TEXT,
			water TEXT,
			season TEXT,
			image_url TEXT
		);`

		this.db.prepare(drop).run()
		this.db.prepare(createGrassTable).run()

		let grasses = [
			{ name: "Bentgrass",			blade: "narrow, flat",			color: "green",					texture: "soft, dense",		growth: "slow",	water: "frequent",		season: "cool", image_url: "#"},
			{ name: "Bermuda",				blade: "sharp, pointed",		color: "deep green",			texture: "dense",			growth: "slow",	water: "frequent",		season: "warm", image_url: "#"},
			{ name: "Centipede",			blade: "pointed with notch",	color: "light green",			texture: "soft, dense",		growth: "slow",	water: "infrequent",	season: "warm", image_url: "#"},
			{ name: "Dichondra",			blade: "round leaves",			color: "pale to bright green",	texture: "dense",			growth: "slow",	water: "frequent",		season: "warm", image_url: "#"},
			{ name: "Fine Fescue",			blade: "hairlike",				color: "dull or gray-green",	texture: "soft",			growth: "fast",	water: "frequent",		season: "cool", image_url: "#"},
			{ name: "Kentucky Bluegrass",	blade: "v-shaped, pointed",		color: "darker green",			texture: "soft",			growth: "fast",	water: "average",		season: "cool", image_url: "#"},
			{ name: "Ryegrass",				blade: "pointed, veined",		color: "dark green",			texture: "soft",			growth: "fase",	water: "average",		season: "cool", image_url: "#"},
			{ name: "St. Augustine",		blade: "broad with round tip",	color: "dark green",			texture: "coarse, spongey",	growth: "slow",	water: "frequent",		season: "warm", image_url: "#"},
			{ name: "Tall Fescue",			blade: "pointed, veined",		color: "dark green",			texture: "coarse, stiff",	growth: "slow",	water: "frequent",		season: "cool", image_url: "#"},
			{ name: "Zoysia",				blade: "narrow, needle-like",	color: "green",					texture: "prickly, stiff",	growth: "slow",	water: "average",		season: "warm", image_url: "#"}
		]

		let insert = this.db.prepare("INSERT INTO grass_types (name, blade, color, texture, growth, water, season, image_url) VALUES (@name, @blade, @color, @texture, @growth, @water, @season, @image_url);")

		let insertMany = this.db.transaction((grasses) => {
			for (const grass of grasses) insert.run(grass)
		})

		insertMany(grasses);
	}

	getLawn(name) {
		let query = `
			SELECT lawns.data, grass_types.*
			FROM lawns
			JOIN grass_types ON grass_types.ROWID = lawns.grass_type_id 
			WHERE lawns.name = ?;
		`
		let params = [name];

		return this.db.prepare(query).expand().get(params)
	}

	addLawn(name, data, zip, grass_type_id) {
		let query = "INSERT INTO lawns (name, data, zip, grass_type_id) VALUES (?, ?, ?, ?);"
		let params = [name, data, zip, grass_type_id];

		return this.db.prepare(query).run(params)
	}

	getLawnNames() {
		let query = "SELECT name FROM lawns;"
		
		return this.db.prepare(query).all()
	}

	saveLawn(data, name) {
		console.log(data)
		console.log(name)
		let query = "UPDATE lawns SET data = ? WHERE name = ?;"

		return this.db.prepare(query).run(JSON.stringify(data), name)
	}
};