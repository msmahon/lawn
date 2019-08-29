module.exports = class Query {
	constructor() {
	}

	randomNum(max) { return Math.round(Math.random()*max,0) }

	createLawn() {
		let data = []
		let metaData = {}
		const healthOptions = ['good', 'fair', 'dead']
		const conditionOptions = ['clover', 'weeds', 'ants']

		let maxWidth = 12
		let maxHeight = 6
		let minWidth = 8
		let minHeight = 3
		let width = this.randomNum(maxWidth)
		let height = this.randomNum(maxHeight)

		while (width < minWidth) { width = this.randomNum(maxWidth) }
		while (height < minHeight) { height = this.randomNum(maxHeight) }

		metaData.columns = width

		for (let i = 0; i < width * height; i++) {
			let cond = [];
			switch (this.randomNum(2)) {
				case 0:
					break
				case 1:
					cond.push(conditionOptions[this.randomNum(1)])
					break
				case 2:
					cond = conditionOptions
					break

			}
			data.push({ id: i, health: healthOptions[this.randomNum(2)], conditions: cond })
		}
		return {data,metaData}
	}
	
};