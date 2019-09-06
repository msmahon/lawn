const Database = require('../services/database')
module.exports = class Lawn {
	constructor(data) {
		this.db = new Database()
		this.data = data
		console.log(this.data)
	}

	createLawn() {
		let query = "INSERT INTO lawns (name, data, columns, zip, grass_type_id) VALUES (?, ?, ?, ?, ?);"
		let params = [this.data.name, this.data.data, columns, zip, grass_type_id];

		// return this.db.connection.prepare(query).run(params)
	}

	updateLawn() {

	}

	getLawn() {

	}
};