import axios from "axios";
import * as ApiSettings from "@/api/settings.js"

export default {
    fetchLevels () {
        return axios
            .get(`${ApiSettings.BACKEND_HOST}/levels`)

    },
    fetchLevel (level){
        return axios.
            get(`${ApiSettings.BACKEND_HOST}/level_info/${level}`);
    },

    reportSolution ({levelId, numberMovements, playerName}){
        const params = new URLSearchParams()
        params.append('levelId', levelId)
        params.append('numberMovements', numberMovements)
        params.append('playerName', playerName)
  
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
  
        return axios
        .post(`${ApiSettings.BACKEND_HOST}/report_solution`,params, config)
      }
}  