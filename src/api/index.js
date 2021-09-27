import axios from "axios";
import * as ApiSettings from "@/api/settings.js"

export default {
    fetchLevels () {
        return axios
        .get(`${ApiSettings.BACKEND_HOST}/levels`)

    },
}  