<template>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
})

// Check this library to visual appareance of all components
// https://element-plus.org/en-US/guide/changelog.html 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
