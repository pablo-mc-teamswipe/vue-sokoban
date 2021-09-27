import axios from "axios";
import ApiSettings from "@/api/settings"

export default {
    fetchLevels () {
        let levels = [];
        let errorFlag = false;
        axios
        .get(`${ApiSettings.BACKEND_HOST}/levels`)
        .then(response => {
            if(response.code == "204"){
                levels = response.data;
            }else{
                errorFlag = true;
            }
        })
        .catch( () => {
            errorFlag = true
        });

        return {
            errorFlag,
            levels
        };
    },
}  