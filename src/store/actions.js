export default {
    // Fetch via AJAX the boards from user
    moveTo ({ commit }, { direction }) {
      commit('moveTo', {direction})
    },
}  

//https://stackoverflow.com/questions/52048944/vuex-call-getters-from-action
// you have access to actions inside an action