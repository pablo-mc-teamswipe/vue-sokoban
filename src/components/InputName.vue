<template>
    <div class="hello" >
        <label for="name">{{t('put_your_name')}}</label>
        <input type="text" name="name" v-model="tempPlayerName" />
        <button @click="callSetPlayerName">{{t('goto_game')}}</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    name: 'input-name',
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
            tempPlayerName: ''
        }
    },
    methods: {
        ...mapActions([
            'setPlayerName'
        ]),
        callSetPlayerName: function(){
            this.setPlayerName({component: this, playerName: this.tempPlayerName})
        },
    }
})
</script>

<style scoped>
</style>

<i18n>
{
  "en": {
    "put_your_name": "Put your name",
    "goto_game": "Go to game",
  },
  "es" : {
    "put_your_name": "Pon tu nombre",
    "goto_game": "Ir al juego",
  },
  "fr" : {
    "put_your_name": "Mets ton nom",
    "goto_game": "Aller au jeu",
  }
}
</i18n>
