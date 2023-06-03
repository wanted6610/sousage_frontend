<script setup>
  import { onMounted } from 'vue';
import {useMainStore} from './stores/main';
import {useProductStore} from './stores/products';

  onMounted(() => {
    const store = useMainStore();
    store.expand();
    store.ready();
    store.tg.MainButton.show();
  });

  
</script>

<template>
<div id="app">
  <p>TELEGRAM FRONT</p>
</div>
</template>

<style scoped>

</style>
