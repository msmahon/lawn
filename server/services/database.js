const Database = require('better-sqlite3')

module.exports = class Query {
	constructor(database) {
		this.db = Database(database, {verbose: console.log})
	}

	resetDatabase() {
		let drop = "DROP TABLE IF EXISTS lawns;"
		let create = "CREATE TABLE lawns (name TEXT, data TEXT);"

		this.db.prepare(drop).run()
		this.db.prepare(create).run()
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
};