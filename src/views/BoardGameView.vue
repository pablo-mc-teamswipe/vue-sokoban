<template>
    <page-layout>
        <sokoban-board :boardIndex="boardIndex"/>
    </page-layout>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex'
import PageLayout from '@/components/PageLayout.vue'
import SokobanBoard from '@/components/SokobanBoard.vue'

export default {
    name: 'Home',
    created: function(){
        this.checkLogin({component: this, requiredStatus: 'auth'})
    },
    components: {
        SokobanBoard, PageLayout
    },
    props: {
        boardIndex: Number
    },
    methods: {
        ...mapActions([
            'checkLogin'
        ])
    }
}
</script>
