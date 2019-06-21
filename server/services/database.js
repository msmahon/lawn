const Database = require('better-sqlite3')
// const db = new Database('test.db', {verbose: console.log})

module.exports = class Query {
    constructor(database) {
        this.db = Database(database, {verbose: console.log})
    }

    resetDatabase() {
        this.db.prepare("DROP TABLE IF EXISTS lawns;").run()
        this.db.prepare("CREATE TABLE lawns (name TEXT, data TEXT);").run()
    }
  
    getLawn(name) {
        return this.db.prepare("SELECT data FROM lawns WHERE name = ?;").pluck(true).get(name)
    }

    addLawn(name, data) {
        return this.db.prepare("INSERT INTO lawns (name, data) VALUES (?, ?);").run(name, data)
    }
};