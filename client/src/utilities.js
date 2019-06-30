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
    saveLawn(data, name) {
        let request = {
            "data": data,
            "name": name
        }
        return axios.post('/api/lawn/save', request)
    }
}