import axios from 'axios'

export default {
    fetchLawnData(lawnName) {
        return axios.get(`/api/lawn/${lawnName}`)
    },
    resetDatabase() {
        return axios.post('/api/lawn/reset')
    },
    async getLawns() {
        let result = await axios.get('/api/getLawns')
        return result.data
    },
    saveLawn(data) {
        return axios.post('/api/lawn/save', data)
    }
}