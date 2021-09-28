import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'
import * as Settings from '@/settings.js'

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

    checkLogin( {commit}, {requiredStatus, component}){
      if(localStorage.playerName != null){
        commit( MutationTypes.SET_PLAYER_NAME, {playerName: localStorage.playerName})
      }
      if(requiredStatus == 'auth' && localStorage.playerName == null){
        component.$router.push(Settings.BASE_GUEST_URL);
      }
      if(requiredStatus == 'guest' && localStorage.playerName != null){
          component.$router.push(Settings.BASE_AUTH_URL);
      }

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
    }
}  

//https://stackoverflow.com/questions/52048944/vuex-call-getters-from-action
// you have access to actions inside an action