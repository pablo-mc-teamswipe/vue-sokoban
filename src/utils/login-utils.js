import API from '@/api'
import * as Settings from '@/settings.js'

export default {
    submitLogin({email, password}){
        return new Promise((resolve, reject) => {
            API.submitLogin({email, password})
            .then( response => {
                if(response.data.code == "200"){
                    localStorage.email = email;
                    localStorage.logged_at_time = new Date().getTime();
                    localStorage.access_token = response.data.data.access_token
                    localStorage.expires_in = response.data.data.expires_in
                    localStorage.refresh_token = response.data.data.refresh_token
                    localStorage.token_type = response.data.data.token_type
                    resolve({status: 'success'})
                }else{
                    reject({status: 'failure', errorLabel: 'bad_credentials'} );
                }
            })
            .catch( () => {
                reject({status: 'failure', errorLabel: 'net_error'} );
            });
        })
    },

    checkStatusCurrentToken(){
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
                    setTimeout( () => resolve('auth'), 200);
                });
            }else{
                return API.refresh()
            }
        }
        return new Promise((resolve) => {
            setTimeout( () => resolve('guest'), 200);
        });
    },

    getStatusLogin(){
        return new Promise( (resolve, reject) => {
            this.checkStatusCurrentToken()
            .then( response => {
                let status = 'guest'
                if(typeof response == 'string'){
                    status = response;
                }else{
                    if(response.data.code == "200"){
                        status = 'auth'
                        localStorage.access_token = response.data.data.access_token;
                        localStorage.refresh_token = response.data.data.refresh_token;
                        localStorage.expires_in = response.data.data.expires_in;
                        localStorage.logged_at_time = new Date().getTime();
                    }else{
                        localStorage.clear();
                    }
                }
                resolve(status)
            })
            .catch( () => {
                reject()
            })
        }) 
    },
};