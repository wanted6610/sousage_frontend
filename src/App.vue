<script setup>
  import { onMounted } from 'vue';
import {useMainStore} from './stores/main';

  onMounted(() => {
    const store = useMainStore();
    store.expand();
    store.ready();
  });

  
</script>

<template>
<div id="app">
  <p>TELEGRAM FRONT</p>
</div>
</template>

<style scoped>

</style>
