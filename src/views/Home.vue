<template>
    <auth-page-standard-layout>
        <levels-list />
    </auth-page-standard-layout>
</template>

<script>
// @ is an alias to /src
import AuthPageStandardLayout from '@/components/AuthPageStandardLayout.vue'
import LevelsList from '@/components/LevelsList.vue'

export default {
  name: 'Home',
  components: {
    LevelsList, AuthPageStandardLayout
  }
}
</script>
