import API from '@/api'
import * as MutationTypes from '@/store/mutation-types'

export default {
    fetchLevels( {commit} ) {
      const listLevels = API.fetchLevels();
      commit(MutationTypes.FETCH_LEVELS, { listLevels });
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