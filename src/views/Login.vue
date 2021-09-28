<template>
    <div>
        <h2>Login view</h2>
        <input-name />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import InputName from '@/components/InputName.vue'

export default defineComponent({
    components: {
        InputName
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
