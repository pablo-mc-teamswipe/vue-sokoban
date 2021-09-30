import API from '@/api'
import * as Settings from '@/settings.js'

export default {
    getStatusLogin(){
        if(localStorage.access_token != null){
            const nowTime = new Date().getTime();
            const secondsLoggedAgo = (nowTime - localStorage.logged_at_time) / 1000;
            console.log(nowTime)
            console.log(localStorage.logged_at_time)
            console.log(secondsLoggedAgo)
            console.log(Settings.SECONDS_BEFORE_EXPIRING)
            console.log(localStorage.expires_in)

            if(secondsLoggedAgo + Settings.SECONDS_BEFORE_EXPIRING < localStorage.expires_in){
                return new Promise((resolve) => {
                    resolve('auth');
                });
            }else{
                return API.refresh()
            }
        }
        return new Promise((resolve) => {
            resolve('guest');
        });
    },
};