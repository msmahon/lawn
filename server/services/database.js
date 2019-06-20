const Database = require('better-sqlite3')
const db = new Database('test.db', {verbose: console.log})

const stmt = db.prepare('CREATE ')
const row = db.prepare('SELECT * FROM users WHERE id=?').get(userId);