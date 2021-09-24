<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <sokoban-board :boardIndex="boardIndex"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SokobanBoard from '@/components/SokobanBoard.vue'

export default {
  name: 'Home',
  components: {
    SokobanBoard
  },
  props: {
    boardIndex: Number
  }
}
</script>
