const Database = require('better-sqlite3')

module.exports = class Query {
	constructor(database) {
		this.db = Database(database, {verbose: console.log})
	}



	resetDatabase() {
		let drop = "DROP TABLE IF EXISTS lawns;"
		let createLawnTable = "CREATE TABLE lawns (name TEXT, data TEXT);"

		this.db.prepare(drop).run()
		this.db.prepare(createLawnTable).run()

		this.addLawn('test',JSON.stringify(
			{
				data: [
					{id: 1, health: 'good', conditions: []},
					{id: 2, health: 'good', conditions: []},
					{id: 3, health: 'good', conditions: []},
					{id: 4, health: 'good', conditions: []},
					{id: 5, health: 'good', conditions: []},
					{id: 6, health: 'good', conditions: []},
					{id: 7, health: 'good', conditions: []},
					{id: 8, health: 'good', conditions: []},
					{id: 9, health: 'good', conditions: []},
					{id: 10, health: 'good', conditions: []},
					{id: 11, health: 'good', conditions: []},
					{id: 12, health: 'good', conditions: []}
				],
				metaData: {
					columns: 4
				}
			}
		))

		this.addLawn('test2',JSON.stringify(
			{
				data: [
					{id: 1, health: 'good', conditions: []},
					{id: 2, health: 'good', conditions: []},
					{id: 3, health: 'good', conditions: []},
					{id: 4, health: 'good', conditions: []},
					{id: 5, health: 'good', conditions: []},
					{id: 6, health: 'good', conditions: []},
					{id: 7, health: 'good', conditions: []},
					{id: 8, health: 'good', conditions: []}
				],
				metaData: {
					columns: 4
				}
			}
		))

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
		let query = "SELECT data FROM lawns WHERE name = ?;"
		let params = [name];

		return this.db.prepare(query).pluck(true).get(params)
	}

	addLawn(name, data) {
		let query = "INSERT INTO lawns (name, data) VALUES (?, ?);"
		let params = [name, data];

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