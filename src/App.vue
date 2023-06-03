<script setup>
  import { onMounted } from 'vue';
import {useMainStore} from './stores/main';
import {useProductStore} from './stores/products';

  onMounted(() => {
    const store = useMainStore();
    store.expand();
    store.ready();
    store.showButton();
    setTimeout(() => {
      store.close();
    }, 5000);
  });

  
</script>

<template>
<div id="app">
  <p>TELEGRAM FRONT</p>
</div>
</template>

<style>
body {
	color: var(--tg-theme-text-color);
	background: var(--tg-theme-bg-color);
}
</style>
