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
    }
}