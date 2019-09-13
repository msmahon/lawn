const Query = require('../services/database')
const process = require('child_process')
let db = new Query('lawn.db')

process.exec('sqlite3 ../client/lawn.db', result => console.log(result))
// let sqlite = spawn('sqlite ../client/lawn.db')
// sqlite.stdout.on('data', data => {
// 	console.log(data)
// })
// exec(".dump grass_types")

// function clearTable(table) {
// 	console.log(`Clearing table ${table}`);

// 	let fieldList = "(" + schema[table].map(field => ` ${field.field} ${field.datatype}`) + ")"

// 	let drop = `DROP TABLE IF EXISTS ${table};`
// 	let create = `CREATE TABLE ${table} ${fieldList}`

// 	try {
// 		db.connection.prepare(drop).run()
// 		db.connection.prepare(create).run()
// 	} catch (err) {
// 		console.error(`Failed clearing ${table} table!`)
// 		console.error(err)
// 		console.trace()
// 		return false
// 	}
// 	console.log(`Cleared ${table}`)
// 	return true
// }