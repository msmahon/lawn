const Database = require('../services/database')
module.exports = class Lawn {
	constructor(data) {
		this.db = new Database()
		this.data = data
	}

	saveLawn() {
		if (this.lawnExists()) {
			return this.updateLawn()
		} else {
			return this.createLawn()
		}
	}

	createLawn() {
		let {name, tiles, columns, zip, grass_type_id} = this.data
		let query = "INSERT INTO lawns (name, tiles, columns, zip, grass_type_id) VALUES (?, ?, ?, ?, ?);"
		let params = [name, JSON.stringify(tiles), columns, zip, grass_type_id]
		return this.db.connection.prepare(query).run(params)
	}

	updateLawn() {
		let {name, tiles, columns, zip, grass_type_id} = this.data
		let query = "UPDATE lawns SET tiles = ?, columns = ?, zip = ?, grass_type_id = ? WHERE name = ?;"
		let params = [JSON.stringify(tiles), columns, zip, grass_type_id, name]
		return this.db.connection.prepare(query).run(params)
	}

	static getLawnData(name) {
		let query = `
			SELECT *
			FROM lawns
			JOIN grass_types ON grass_types.rowid = lawns.grass_type_id
			LEFT JOIN events ON events.lawn_name = lawns.name
			WHERE lawns.name = ?;
		`
		let data = (new Database()).connection.prepare(query).expand().get(name)
		data.lawns.tiles = JSON.parse(data.lawns.tiles)
		return data
	}

	lawnExists() {
		return this.db.connection.prepare("SELECT COUNT(*) FROM lawns WHERE name = ?;").pluck().get(this.data.name) === 1
	}
};