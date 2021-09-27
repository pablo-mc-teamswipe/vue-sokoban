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

    initLevel( {commit}, {boardIndex}){
      commit(MutationTypes.INIT_LEVEL, {boardIndex})
    }
}  

//https://stackoverflow.com/questions/52048944/vuex-call-getters-from-action
// you have access to actions inside an action