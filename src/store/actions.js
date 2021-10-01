import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'
import * as Settings from '@/settings.js'
import LoginUtils from '../utils/login-utils'

export default {
    // Login actions
    handleStatusLoginResponse({commit} , {source, response, requiredStatus, component}){
        let status = 'guest'
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
            }else{
                localStorage.clear();
                if(source == 'beforeViewDisplay'){
                    commit( MutationTypes.LOGIN_CHECK_SUCCESS_EXPIRED_TOKEN)
                }
            }
        }

        if( source == 'beforeApiRequest'){
            return status
        }

        if(source == 'beforeViewDisplay'){
            if(status == 'auth'){
                commit( MutationTypes.LOGIN_CHECK_SUCCESS, {playerName: localStorage.email})
            }
    
            if(requiredStatus == 'auth' && status == 'guest'){
                component.$router.push(Settings.BASE_GUEST_URL);
            }
            if(requiredStatus == 'guest' && status == 'auth'){
                component.$router.push(Settings.BASE_AUTH_URL);
            }
        }
    },

    checkLoginBeforeApiRequest({ dispatch} ){
        return new Promise((resolve, reject) => {
            LoginUtils.getStatusLogin()
            .then( response => {
                const status = dispatch('handleStatusLoginResponse', {source: 'beforeApiRequest', response})
                resolve(status);
            })
            .catch( () => {
                reject();
            })
        });
    },

    submitLogin( {commit}, {component, email, password}){
        commit(MutationTypes.LOGIN_REQUEST)

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
                commit(MutationTypes.LOGIN_SUCCESS)
            }else{
                commit(MutationTypes.LOGIN_FAILURE , {errorLabel: 'bad_credentials'} );
            }
        })
        .catch( () => {
            commit(MutationTypes.LOGIN_FAILURE , {errorLabel: 'net_error'} );
        });
    },

    checkLogin( {commit, dispatch} , {requiredStatus, component} ){
        commit(MutationTypes.LOGIN_CHECK_REQUEST)
        LoginUtils.getStatusLogin()
        .then( response => {
            dispatch('handleStatusLoginResponse' , {source: 'beforeViewDisplay', response, component, requiredStatus})
        }).
        catch( () => {
            commit(MutationTypes.LOGIN_CHECK_FAILURE );
        })
    },

    // Logout actions
    logout( {commit} , {component}){
        localStorage.clear();
        commit(MutationTypes.LOGOUT)
        component.$router.push(Settings.BASE_GUEST_URL)
    },

    // Fetch data actions
    fetchLevels( {commit} ) {
        commit( MutationTypes.FETCH_LEVELS_REQUEST)

        API.fetchLevels()
        .then( response => {
            if(response.data.code == "204"){
                commit(MutationTypes.FETCH_LEVELS_SUCCESS, { listLevels: response.data.data } );
            }else{
                commit(MutationTypes.FETCH_LEVELS_FAILURE );
            }
        })
        .catch( () => {
            commit(MutationTypes.FETCH_LEVELS_FAILURE );
        });
    },

    getLevelInfo( {commit}, {level}){
        commit( MutationTypes.GET_LEVEL_INFO_REQUEST)

        API.fetchLevel(level)
        .then( response => {
            if(response.data.code == "204"){
                commit(MutationTypes.GET_LEVEL_INFO_SUCCESS, {level: response.data.level});
            }else{
                commit(MutationTypes.GET_LEVEL_INFO_FAILURE );
            }
        })
        .catch( () => {
            commit(MutationTypes.GET_LEVEL_INFO_FAILURE );
        });
    },

    // Post data actions
    reportSolution( {commit, dispatch} , {levelId, numberMovements}){
        commit( MutationTypes.REPORT_SOLUTION_REQUEST)
        dispatch('checkLoginBeforeApiRequest').then( status => {
            console.log(status)
            if( status == 'auth'){
                console.log(`reporting solution for level ${levelId} with ${numberMovements} movements`)
                API.reportSolution({levelId, numberMovements, playerName: localStorage.playerName})
                .then( response => {
                    if(response.data.code == "204"){
                        commit(MutationTypes.REPORT_SOLUTION_SUCCESS );
                    }else{
                        commit(MutationTypes.REPORT_SOLUTION_FAILURE );
                    }
                })
                .catch( () => {
                    commit(MutationTypes.REPORT_SOLUTION_FAILURE );
                });
            }
        });
    },

    // Game actions
    moveTo ({ commit }, { direction }) {
        commit(MutationTypes.MOVE_TO, {direction})
    },

    back ({commit}){
        commit(MutationTypes.GOTO_BACK)
    },

    forward ({commit}){
        commit(MutationTypes.GOTO_FORWARD)
    },
}  

//https://stackoverflow.com/questions/52048944/vuex-call-getters-from-action
// you have access to actions inside an action