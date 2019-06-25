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
					{id: 1, cond: "healthy"},
					{id: 2, cond: "healthy"},
					{id: 3, cond: "healthy"},
					{id: 4, cond: "healthy"},
					{id: 5, cond: "healthy"},
					{id: 6, cond: "healthy"},
					{id: 7, cond: "healthy"},
					{id: 8, cond: "healthy"},
					{id: 9, cond: "healthy"},
					{id: 10, cond: "healthy"},
					{id: 11, cond: "healthy"},
					{id: 12, cond: "healthy"}
				],
				metaData: {
					columns: 4
				}
			}
		))

		this.addLawn('test2',JSON.stringify(
			{
				data: [
					{id: 1, cond: "healthy"},
					{id: 2, cond: "healthy"},
					{id: 3, cond: "healthy"},
					{id: 4, cond: "healthy"},
					{id: 5, cond: "healthy"},
					{id: 6, cond: "healthy"},
					{id: 7, cond: "healthy"},
					{id: 8, cond: "healthy"}
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