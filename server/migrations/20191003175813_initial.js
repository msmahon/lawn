
exports.up = function(knex) {
	return knex.schema
		.createTable('grass_types', (table) => {
			table.increments('id').primary()
			table.string('name')
			table.string('blade')
			table.string('color')
			table.string('texture')
			table.string('growth')
			table.string('water')
			table.string('season')
			table.string('image_url')
		})
		.createTable('lawns', (table) => {
			table.increments('id').primary()
			table.string('name')
			table.json('tiles')
			table.integer('columns')
			table.string('zip',8)
			table.integer('grass_type_id').unsigned()
			table.foreign('grass_type_id').references('id').inTable('grass_types')
		})
};

exports.down = function(knex) {
	return knex.schema
		.dropTable('lawns')
		.dropTable('grass_types')
};
