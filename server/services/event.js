module.exports = class Query {
	constructor(database) {
		this.table = 'events'
		this.database = database
	}

	recentEvents(lawn) {
		return this.database.getAllEvents(lawn, 5)
	}

	
};