<script setup>
  import { onMounted } from 'vue';
import {useMainStore} from './stores/main';
import {useProductStore} from './stores/products';
import {useUserStore} from './stores/user';

    const store = useMainStore();
    const user = useUserStore();

  onMounted(() => {

    store.expand();
    store.ready();
  });

  
</script>

<template>
<div id="app">
  <p>TELEGRAM FRONT</p>
  <p v-if="user.user">{{user.user}}</p>
</div>
</template>

<style>
body {
	color: var(--tg-theme-text-color);
	background: var(--tg-theme-bg-color);
}
</style>
