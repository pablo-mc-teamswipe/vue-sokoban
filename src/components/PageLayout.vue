<template>
    <page-header />
    <div class="content">
        <slot/>
    </div>
    <page-footer />
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    components: {
        PageHeader, PageFooter
    }
})
</script>

<style scoped>
    .content{
        min-height: calc(100vh - 156px);
        padding: 10px;

    }
</style>