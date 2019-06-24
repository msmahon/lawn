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
					{id: 1, cond: "Healthy"},
					{id: 2, cond: "Healthy"},
					{id: 3, cond: "Healthy"},
					{id: 4, cond: "Healthy"},
					{id: 5, cond: "Healthy"},
					{id: 6, cond: "Healthy"},
					{id: 7, cond: "Healthy"},
					{id: 8, cond: "Healthy"},
					{id: 9, cond: "Healthy"},
					{id: 10, cond: "Healthy"},
					{id: 11, cond: "Healthy"},
					{id: 12, cond: "Healthy"}
				],
				metaData: {
					columns: 4
				}
			}
		))

		this.addLawn('test2',JSON.stringify(
			{
				data: [
					{id: 1, cond: "Healthy"},
					{id: 2, cond: "Healthy"},
					{id: 3, cond: "Healthy"},
					{id: 4, cond: "Healthy"},
					{id: 5, cond: "Healthy"},
					{id: 6, cond: "Healthy"},
					{id: 7, cond: "Healthy"},
					{id: 8, cond: "Healthy"}
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