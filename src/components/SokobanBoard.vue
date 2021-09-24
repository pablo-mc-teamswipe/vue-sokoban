<template>
  <div class="hello" >
    <div class="rowButtons" v-if="!levelCompleted && !inMovieMovements">
      <button @click="moveTo({direction:'up'})">Up</button>
      <button @click="moveTo({direction: 'down'})">Down</button>
      <button @click="moveTo({direction:'left'})">Left</button>
      <button @click="moveTo({direction:'right'})">Right</button>
    </div>
    <div v-if="levelCompleted">
      LEVEL COMPLETED !!!
    </div>
    <div v-if="inMovieMovements && !levelCompleted">
      PAUSE {{ directionMovie }} TO MOVE!!
    </div>
    <div class="rowButtons">
      <button @click="rewind">Rewind</button>
      <button @click="back">Back</button>
      <button @click="pause">Pause</button>
      <button @click="forward">Forward</button>
      <button @click="fastForward">Fast-Forward</button>
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
  data: function(){
    return {
      inMovieMovements: false,
      directionMovie: '',
      interval: null
    }
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
    ]),
    fastForward: function(){
      if(this.interval != null){
        return
      }
      this.inMovieMovements = true
      this.directionMovie = 'FAST-FORWARD'
      const componentObject = this;
      this.interval = window.setInterval( function(){
        componentObject.forward();
        console.log('forward')
        if(componentObject.numberMovements == componentObject.numberMovementsPlayed){
          componentObject.pause();
        }
      }, 500);
    },
    rewind: function(){
      if(this.interval != null){
        return
      }
      this.inMovieMovements = true
      this.directionMovie = 'REWIND'
      const componentObject = this;
      this.interval = window.setInterval( function(){
        componentObject.back();
        console.log('back')
        if(0 == componentObject.numberMovementsPlayed){
          componentObject.pause();
        }
      }, 500);
    },
    pause: function(){
      this.inMovieMovements = false
      clearInterval(this.interval)
      this.interval = null
    },
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
