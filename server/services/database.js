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

		this.addLawn('test',JSON.stringify(
			{
				data: [
					{id: 1, conditions: ["healthy"]},
					{id: 2, conditions: ["healthy"]},
					{id: 3, conditions: ["healthy"]},
					{id: 4, conditions: ["healthy"]},
					{id: 5, conditions: ["healthy"]},
					{id: 6, conditions: ["healthy"]},
					{id: 7, conditions: ["healthy"]},
					{id: 8, conditions: ["healthy"]},
					{id: 9, conditions: ["healthy"]},
					{id: 10, conditions: ["healthy"]},
					{id: 11, conditions: ["healthy"]},
					{id: 12, conditions: ["healthy"]}
				],
				metaData: {
					columns: 4
				}
			}
		))

		this.addLawn('test2',JSON.stringify(
			{
				data: [
					{id: 1, conditions: ["healthy"]},
					{id: 2, conditions: ["healthy"]},
					{id: 3, conditions: ["healthy"]},
					{id: 4, conditions: ["healthy"]},
					{id: 5, conditions: ["healthy"]},
					{id: 6, conditions: ["healthy"]},
					{id: 7, conditions: ["healthy"]},
					{id: 8, conditions: ["healthy"]}
				],
				metaData: {
					columns: 4
				}
			}
		))
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
};