<template>
  <div class="hello" >
    <div class="rowButtons">
      <button @click="moveTo({direction:'up'})">Up</button>
      <button @click="moveTo({direction: 'down'})">Down</button>
      <button @click="moveTo({direction:'left'})">Left</button>
      <button @click="moveTo({direction:'right'})">Right</button>
    </div>
    <div class="rowButtons">
      <!--button @click="moveTo({direction:'up'})">Rewind</button-->
      <button @click="back">Back</button>
      <!--button @click="moveTo({direction:'left'})">Pause</button-->
      <button @click="forward">Forward</button>
      <!--button @click="moveTo({direction:'right'})">Fast-Forward</button-->
    </div>
    <div>Movements: {{ numberMovementsPlayed }} of {{ numberMovements }} </div>
    <!--div class="listMovements">
      <div v-for="(movement, indexMovement) in listMovements" :key="indexMovement">
        {{movement.direction}} Moves brick: {{ movement.indexBrickMoved}} 
      </div>
    </div-->
    <ul>
      <li v-for="(row, indexRow) in board.cells" :key="indexRow" >
        <sokoban-cell v-for="(cell, indexColumn) in row" :key="indexColumn" 
          :row="indexRow" :column="indexColumn" ></sokoban-cell>
      </li>
    </ul>
  </div>
</template>

<script>
import SokobanCell from './SokobanCell.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { SokobanCell },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'board',
      'numberMovements',
      'numberMovementsPlayed'
      //,'listMovements'
    ])
  },
  methods: {
    ...mapActions([
      'moveTo',
      'back',
      'forward'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li{
  clear: both;
  list-style: none;
}
.rowButtons{
  clear: both;
}
/*.listMovements{
  position: fixed;
  top: 0;
  right: 200px;
  width: 180px;
}*/
</style>
