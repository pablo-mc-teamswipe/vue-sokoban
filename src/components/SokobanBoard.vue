<template>
  <div class="hello" >
    <div class="rowButtons" v-if="!levelCompleted">
      <button @click="moveTo({direction:'up'})">Up</button>
      <button @click="moveTo({direction: 'down'})">Down</button>
      <button @click="moveTo({direction:'left'})">Left</button>
      <button @click="moveTo({direction:'right'})">Right</button>
    </div>
    <div v-else>
      LEVEL COMPLETED !!!
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
      <li v-for="indexRow in boards[boardIndex].rows" :key="indexRow" >
        <sokoban-cell v-for="indexColumn in boards[boardIndex].columns" :key="indexColumn" 
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
  name: 'sokoban-board',
  props: {
    boardIndex: Number
  },
  created: function(){
    this.initLevel({'boardIndex': this.boardIndex});
  },
  computed: {
    ...mapState([
      'boards',
      'numberMovements',
      'numberMovementsPlayed',
      'levelCompleted'
      //,'listMovements'
    ]) 
  },
  methods: {
    ...mapActions([
      'moveTo',
      'back',
      'forward',
      'initLevel'
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
