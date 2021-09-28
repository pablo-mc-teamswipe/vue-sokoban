<template>
    <div class="solutions-reported">
        <h2>Ranking</h2>
        <ul>
            <li v-for="(solution, index) in solutionsReported" :key="index">
                {{solution.user_name}} {{solution.number_movements}}
            </li>
        </ul>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
    name: 'sokoban-solutions-reported',
    setup() {
        
    },
    computed: {
        ...mapState([
            'solutionsReported'
        ])
    }
})
</script>

<style scoped>
    .solutions-reported{
        width: 160px;
        float: right;
    }
    li{
        list-style: none;
    }
</style>