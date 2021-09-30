import axios from "axios";
import * as ApiSettings from "@/api/settings.js"

export default {
    fetchLevels () {
        const instance = axios.create({
            baseURL: ApiSettings.BACKEND_HOST,
            headers: {'Authorization': 'Bearer '+localStorage.access_token}
        });
        return instance.get('/levels')

    },

    fetchLevel (level){
        const instance = axios.create({
            baseURL: ApiSettings.BACKEND_HOST,
            headers: {'Authorization': 'Bearer '+localStorage.access_token}
        });

        return instance.get(`/level_info/${level}`)
    },

    reportSolution ({levelId, numberMovements, playerName}){
        const params = new URLSearchParams()
        params.append('levelId', levelId)
        params.append('numberMovements', numberMovements)
        params.append('playerName', playerName)

        const instance = axios.create({
            baseURL: ApiSettings.BACKEND_HOST,
            headers: {
                'Authorization': 'Bearer '+localStorage.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return instance.post('/report_solution',params)
    },

    submitLogin ({email, password}){
        const params = new URLSearchParams()
        params.append('email', email)
        params.append('password', password)
  
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios
            .post(`${ApiSettings.BACKEND_HOST}/login`,params, config)
    
    },

    refresh(){
        const params = new URLSearchParams()
        params.append('refresh_token', localStorage.refresh_token)
  
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios
            .post(`${ApiSettings.BACKEND_HOST}/refresh`,params, config)

    }
}  