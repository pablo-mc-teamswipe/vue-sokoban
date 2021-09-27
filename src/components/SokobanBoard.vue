<template>
  <div class="hello" >
    <sokoban-board-panel-control />
    <sokoban-board-table :boardIndex="boardIndex" />
  </div>
</template>

<script>
import SokobanBoardPanelControl from './SokobanBoardPanelControl.vue'
import SokobanBoardTable from './SokobanBoardTable.vue'

export default {
  components: { SokobanBoardPanelControl, SokobanBoardTable},
  name: 'sokoban-board',
  props: {
    boardIndex: Number
  },
}
</script>

