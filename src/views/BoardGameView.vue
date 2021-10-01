<template>
    <auth-page-standard-layout>
        <sokoban-board :boardIndex="boardIndex"/>
    </auth-page-standard-layout>
</template>

<script>
// @ is an alias to /src
import AuthPageStandardLayout from '@/components/AuthPageStandardLayout.vue'
import SokobanBoard from '@/components/SokobanBoard.vue'

export default {
    name: 'board-game-view',
    components: {
        SokobanBoard, AuthPageStandardLayout
    },
    props: {
        boardIndex: Number
    },
}
</script>
