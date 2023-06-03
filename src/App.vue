<template>
  <div id="app">
    <p>TELEGRAM FRONT</p>
    <p @click="userStore.addProduct">TEST</p>
  </div>
</template>

<style>
body {
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
}
</style>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "./stores/main";
import { useUserStore } from "./stores/user";

export default {
  computed: {
    ...mapStores(useMainStore, useUserStore),
  },
  mounted() {
    this.mainStore.expand();
    this.mainStore.ready();
  },
  watch: {
    userStore: {
      handler: function () {
        if (this.userStore.selectedProducts.length) {
          this.mainStore.enableShowConfirmation();
        } else {
          this.mainStore.disableShowConfirmation();
        }
      },
      deep: true,
    },
  },
};
</script>
