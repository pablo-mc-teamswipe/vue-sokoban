<template>
    <div>
        <button @click="switchLanguage('en')">EN</button>
        <button @click="switchLanguage('es')">ES</button>
        <button @click="switchLanguage('fr')">FR</button>
        <div v-if="playerName != null">
            {{ playerName}}
            <span @click="logout">X</span>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'
import i18n from '@/i18n'

export default defineComponent({
    name: 'language-selector',
    computed: {
        ...mapState([
            'playerName'
        ])
    },
    methods: {
        ...mapActions([
            'clearPlayerName'
        ]),
        switchLanguage: function(newLanguage){
            i18n.global.locale.value = newLanguage
        },
        logout: function(){
            this.clearPlayerName({component: this})
        }
    }
})
</script>