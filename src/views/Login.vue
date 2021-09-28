<template>
    <page-layout>
        <h2>Sokoban Game</h2>
        <input-name />
    </page-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import PageLayout from '@/components/PageLayout.vue'
import InputName from '@/components/InputName.vue'

export default defineComponent({
    components: {
        InputName, PageLayout
    },
    setup() {
        
    },
    created: function(){
        this.checkLogin({component: this, requiredStatus: 'guest'})
    },
    methods: {
        ...mapActions([
            'checkLogin'
        ])
    }
})
</script>
