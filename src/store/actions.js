import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'
import * as Settings from '@/settings.js'
import LoginUtils from '../utils/login-utils'

export default {
    fetchLevels( {commit} ) {
        commit( MutationTypes.FETCHING_DATA)

        API.fetchLevels()
        .then( response => {
            if(response.data.code == "204"){
                commit(MutationTypes.FETCH_LEVELS, { listLevels: response.data.data } );
            }else{
                commit(MutationTypes.ERROR );
            }
        })
        .catch( () => {
            commit(MutationTypes.ERROR );
        });
    },

    moveTo ({ commit }, { direction }) {
        commit(MutationTypes.MOVE_TO, {direction})
    },

    back ({commit}){
        commit(MutationTypes.GOTO_BACK)
    },

    forward ({commit}){
        commit(MutationTypes.GOTO_FORWARD)
    },

    initLevel( {commit}, {level}){
        commit( MutationTypes.FETCHING_DATA)

        API.fetchLevel(level)
        .then( response => {
            if(response.data.code == "204"){
                commit(MutationTypes.INIT_LEVEL, {level: response.data.level});
            }else{
                commit(MutationTypes.ERROR );
            }
        })
        .catch( () => {
            commit(MutationTypes.ERROR );
        });
    },

    checkLogin( {commit} , {requiredStatus, component} ){
        let status = 'guest'
        LoginUtils.getStatusLogin()
        .then( response => {
            console.log(response)
            if(typeof response == 'string'){
                status = response;
            }else{
                if(response.data.code == "200"){
                    status = 'auth'
                    localStorage.access_token = response.data.data.access_token;
                    localStorage.refresh_token = response.data.data.refresh_token;
                    localStorage.expires_in = response.data.data.expires_in;
                    localStorage.logged_at_time = new Date().getTime();
                }
            }

            if(status == 'auth'){
                commit( MutationTypes.SET_PLAYER_NAME, {playerName: localStorage.email})
            }
    
            if(requiredStatus == 'auth' && status == 'guest'){
                component.$router.push(Settings.BASE_GUEST_URL);
            }
            if(requiredStatus == 'guest' && status == 'auth'){
                component.$router.push(Settings.BASE_AUTH_URL);
            }

        }).
        catch( () => {
            commit(MutationTypes.ERROR );
        })


    },

    setPlayerName( {commit} , {component, playerName}){
        localStorage.playerName = playerName;
        commit(MutationTypes.SET_PLAYER_NAME, {playerName})
        component.$router.push(Settings.BASE_AUTH_URL)
    },

    clearPlayerName( {commit} , {component}){
        localStorage.clear();
        commit(MutationTypes.SET_PLAYER_NAME, {playerName: null})
        component.$router.push(Settings.BASE_GUEST_URL)
    },

    reportSolution( {commit} , {levelId, numberMovements}){
        commit( MutationTypes.FETCHING_DATA)

        API.reportSolution({levelId, numberMovements, playerName: localStorage.playerName})
        .then( response => {
            if(response.data.code == "204"){
                commit(MutationTypes.ERROR );
            }else{
                commit(MutationTypes.ERROR );
            }
        })
        .catch( () => {
            commit(MutationTypes.ERROR );
        });
    },

    submitLogin( {commit}, {component, email, password}){
        commit(MutationTypes.FETCHING_DATA)

        API.submitLogin({email, password})
        .then( response => {
            if(response.data.code == "200"){
                localStorage.email = email;
                localStorage.logged_at_time = new Date().getTime();
                localStorage.access_token = response.data.data.access_token
                localStorage.expires_in = response.data.data.expires_in
                localStorage.refresh_token = response.data.data.refresh_token
                localStorage.token_type = response.data.data.token_type
                component.$router.push(Settings.BASE_AUTH_URL)
            }else{
                commit(MutationTypes.ERROR );
            }
        })
        .catch( () => {
            commit(MutationTypes.ERROR );
        });
    }
}  

//https://stackoverflow.com/questions/52048944/vuex-call-getters-from-action
// you have access to actions inside an action