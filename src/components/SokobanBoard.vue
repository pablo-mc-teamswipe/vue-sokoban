<template>
  <div class="hello" >
    <sokoban-board-panel-control />
    <div class="down">
      <sokoban-solutions-reported />
      <sokoban-board-table :boardIndex="boardIndex" />
    </div>
  </div>
</template>

<script>
import SokobanBoardPanelControl from './SokobanBoardPanelControl.vue'
import SokobanBoardTable from './SokobanBoardTable.vue'
import SokobanSolutionsReported from './SokobanSolutionsReported.vue'

export default {
  components: { SokobanBoardPanelControl, SokobanBoardTable, SokobanSolutionsReported},
  name: 'sokoban-board',
  props: {
    boardIndex: Number
  },
}
</script>

<style scoped>
.hello{
  margin: 0 auto;
  display: block;
}
.down{
  clear: both;
}
</style>