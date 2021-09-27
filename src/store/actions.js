import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'

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
            commit(MutationTypes.INIT_LEVEL, {levelData: response.data.level_data});
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