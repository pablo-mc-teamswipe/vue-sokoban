import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'
import * as Settings from '@/settings.js'
import LoginUtils from '../utils/login-utils'

export default {
    submitLogin( {commit}, {component, email, password}){
        commit(MutationTypes.LOGIN_REQUEST)

        LoginUtils.submitLogin({ email, password})
        .then( () => {
            commit(MutationTypes.LOGIN_SUCCESS)
            component.$router.push(Settings.BASE_AUTH_URL)
        })
        .catch( ({errorLabel}) => {
            commit(MutationTypes.LOGIN_FAILURE , {errorLabel} );
        });
    },

    checkLogin( {commit} , {requiredStatus, component} ){
        commit(MutationTypes.LOGIN_CHECK_REQUEST)
        LoginUtils.getStatusLogin()
        .then( status => {
            console.log(status)
            if(status == 'auth'){
                commit( MutationTypes.LOGIN_CHECK_SUCCESS, {playerName: localStorage.email})
            }
    
            if(requiredStatus == 'auth' && status == 'guest'){
                component.$router.push(Settings.BASE_GUEST_URL);
            }
            if(requiredStatus == 'guest' && status == 'auth'){
                component.$router.push(Settings.BASE_AUTH_URL);
            }
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
    reportSolution( {commit} , {levelId, numberMovements}){
        commit( MutationTypes.REPORT_SOLUTION_REQUEST)
        LoginUtils.getStatusLogin().then( status => {
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