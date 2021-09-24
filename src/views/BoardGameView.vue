<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <board-game :boardIndex="boardIndex"/>
  </div>
</template>

<script>
// @ is an alias to /src
import BoardGame from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    BoardGame
  },
  props: {
    boardIndex: Number
  }
}
</script>
