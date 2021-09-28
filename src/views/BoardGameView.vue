<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <sokoban-board :boardIndex="boardIndex"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
import SokobanBoard from '@/components/SokobanBoard.vue'

export default {
  name: 'Home',
  created: function(){
    this.checkLogin({component: this, requiredStatus: 'auth'})
  },
  components: {
    SokobanBoard
  },
  props: {
    boardIndex: Number
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ])
  }
}
</script>
