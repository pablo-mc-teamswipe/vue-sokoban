<template>
    <div class="panel-control" >
        <div class="rowButtons" v-if="!levelCompleted && !inMovieMovements">
            <button @click="moveTo({direction:'up'})">{{t('up')}}</button>
            <button @click="moveTo({direction: 'down'})">{{t('down')}}</button>
            <button @click="moveTo({direction:'left'})">{{t('left')}}</button>
            <button @click="moveTo({direction:'right'})">{{t('right')}}</button>
        </div>
        <div v-if="levelCompleted">
            {{t('level_completed')}}
            <button @click="callReportSolution">{{t('report_solution')}}</button>
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
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    setup() {
        const { t } = useI18n({
        inheritLocale: true,
        useScope: 'local'
        })

        // Something todo ..

        return { t }
    },
    data: function(){
        return {
        inMovieMovements: false,
        directionMovie: '',
        interval: null
        }
    },
    computed: {
        ...mapState([
            'levelId',
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
            'reportSolution'
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
        callReportSolution: function(){
            this.reportSolution({levelId: this.levelId, numberMovements: this.numberMovements})
        },
    }
})
</script>

<style scoped>
.panel-control{
    float: left;
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

<i18n>
{
  "en": {
    "up": "Up",
    "down": "Down",
    "left": "Left",
    "right": "Right",
    "level_completed": "LEVEL COMPLETED !!!",
    "report_solution": "REPORT SOLUTION"
  },
  "es" : {
    "up": "Arriba",
    "down": "Abajo",
    "left": "Izquierda",
    "right": "Derecha",
    "level_completed": "¡ NIVEL COMPLETADO !",
    "report_solution": "ENVIAR SOLUCIÓN"
  },
  "fr" : {
    "up": "Haut",
    "down": "Bas",
    "left": "Gauche",
    "right": "Droite",
    "level_completed": "Niveau terminé !!!",
    "report_solution": "Solution de rapport"
  }
}
</i18n>
