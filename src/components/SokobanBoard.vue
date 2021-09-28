<template>
  <div class="hello" >
    <sokoban-board-panel-control />
    <sokoban-board-table :boardIndex="boardIndex" />
    <sokoban-solutions-reported />
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

