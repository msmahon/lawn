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