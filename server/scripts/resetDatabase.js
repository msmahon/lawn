const Query = require('../services/database')
let db = new Query('lawn.db')

let schema = {
	"lawns": [
		{"field": "name",			"datatype": "TEXT"},
		{"field": "data",			"datatype": "TEXT"},
		{"field": "columns", 		"datatype": "INTEGER"},
		{"field": "zip",			"datatype": "INTEGER"},
		{"field": "grass_type_id",	"datatype": "INTEGER"},
	],
	"events": [
		{"field": "type", 		"datatype": "INTEGER"},
		{"field": "lawn_name",	"datatype": "TEXT"},
		{"field": "created",	"datatype": "DATETIME DEFAULT current_timestamp"}
	]
}

clearTable('lawns')
clearTable('events')

function clearTable(table) {
	console.log(`Clearing table ${table}`);

	let fieldList = "(" + schema[table].map(field => ` ${field.field} ${field.datatype}`) + ")"

	let drop = `DROP TABLE IF EXISTS ${table};`
	let create = `CREATE TABLE ${table} ${fieldList}`

	try {
		db.connection.prepare(drop).run()
		db.connection.prepare(create).run()
	} catch (err) {
		console.error(`Failed clearing ${table} table!`)
		console.error(err)
		console.trace()
		return false
	}
	console.log(`Cleared ${table}`)
	return true
}