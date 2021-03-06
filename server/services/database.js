const Database = require('better-sqlite3')
const Seeder = require('./seeder')
const Knex = require('knex')

// ({
// 	client: 'sqlite3',
// 	connection: {
// 		filename: '../lawn.db'
// 	}
// })

// knex.raw("SELECT 1").then(
// 	(result) => console.log(result)
// );

module.exports = class Query {
	constructor(database = 'lawn.db') {
		this.connection = Database(database, {verbose: console.log})

		this.knex = new Knex({
			client: 'sqlite3',
			connection: {
				filename: '../lawn.db'
			}
		})

		this.knex.raw("SELECT 1").then(
			(result) => console.log(result)
		);
	}

	randomLawnConfiguration() {
		let data = []
		let metaData = {}
		const healthOptions = ['good', 'fair', 'dead']
		const conditionOptions = ['clover', 'weeds', 'ants']

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
		let createLawnTable = "CREATE TABLE lawns (name TEXT, data TEXT, columns INTEGER, zip INTEGER, grass_type_id INTEGER);"

		this.connection.prepare(drop).run()
		this.connection.prepare(createLawnTable).run()

		let lawn1 = (new Seeder()).createLawn()
		let lawn2 = (new Seeder()).createLawn()

		this.addLawn('test1', JSON.stringify(lawn1.data), lawn1.metaData.columns, 29601, this.randomNum(10))
		this.addLawn('test2', JSON.stringify(lawn2.data),lawn2.metaData.columns, 97008, this.randomNum(10))
		
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

		this.connection.prepare(drop).run()
		this.connection.prepare(createGrassTable).run()

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

		let insert = this.connection.prepare("INSERT INTO grass_types (name, blade, color, texture, growth, water, season, image_url) VALUES (@name, @blade, @color, @texture, @growth, @water, @season, @image_url);")

		let insertMany = this.connection.transaction((grasses) => {
			for (const grass of grasses) insert.run(grass)
		})

		insertMany(grasses);
	}

	getLawn(name) {
		let query = `
			SELECT lawns.data, lawns.columns, grass_types.*
			FROM lawns
			JOIN grass_types ON grass_types.ROWID = lawns.grass_type_id 
			WHERE lawns.name = ?;
		`
		let params = [name];

		return this.connection.prepare(query).expand().get(params)
	}

	addLawn(name, data, columns, zip, grass_type_id) {
		let query = "INSERT INTO lawns (name, data, columns, zip, grass_type_id) VALUES (?, ?, ?, ?, ?);"
		let params = [name, data, columns, zip, grass_type_id];

		return this.connection.prepare(query).run(params)
	}

	getLawnNames() {
		let query = "SELECT name FROM lawns;"
		return this.connection.prepare(query).all()
	}

	getGrassTypes() {
		let query = "SELECT rowid, name FROM grass_types;"
		return this.connection.prepare(query).all()
	}

	saveLawn(data) {
		let query = "UPDATE lawns SET data = ? WHERE name = ?;"
		return this.connection.prepare(query).run(JSON.stringify(data.tiles), data.name)
	}


	// Events
	getAllEvents(lawn, days) {
		let query = "SELECT * FROM events WHERE events.lawn_name = ? ORDER BY created DESC LIMIT 5;"

		return this.connection.prepare(query).get(lawn)
	}
};