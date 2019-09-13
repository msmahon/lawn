import axios from 'axios'

export default {
    getLawnData(lawnName) {
        return axios.get(`/api/lawn/${lawnName}`)
    },
    resetDatabase() {
        return axios.post('/api/lawn/reset')
    },
    async getLawns() {
        let result = await axios.get('/api/Lawns')
        return result.data
    },
    async getGrassTypes() {
        let result = await axios.get('/api/GrassTypes')
        return result.data
    },
    saveLawn(data) {
        return axios.post('/api/lawn/save', data)
    },
    saveNewLawn(newLawn) {
        let data = {}
        data.name = newLawn.name
        data.columns = newLawn.width
        data.zip = newLawn.zip
        data.grass_type_id = newLawn.grass_type_id

        data.tiles = []
        for (let i = 0; i < newLawn.width * newLawn.height; i++) {
            data.tiles.push({ id: i, health: 'good', conditions: [] });
        }
        this.saveLawn(data)
    }
}