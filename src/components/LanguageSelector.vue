<template>
    <div>
        <button @click="switchLanguage('en')">EN</button>
        <button @click="switchLanguage('es')">ES</button>
        <button @click="switchLanguage('fr')">FR</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import i18n from '@/i18n'

export default defineComponent({
    name: 'language-selector',
    methods: {
        switchLanguage: function(newLanguage){
            i18n.global.locale.value = newLanguage
        },
    }
})
</script>