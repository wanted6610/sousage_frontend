<template>
  <div id="app">
    <p>TELEGRAM FRONT</p>
    <p @click="userStore.addProduct">TEST</p>
    <p @click="changeStep">change step</p>
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
import "./tgButtonParams";
import tgButtonParams from "./tgButtonParams";

export default {
  data() {
    return {
      step: 1,
    };
  },
  computed: {
    ...mapStores(useMainStore, useUserStore),
  },
  mounted() {
    this.mainStore.expand();
    this.mainStore.ready();
  },
  methods: {
    changeStep() {
      this.step += 1;
      console.log(this.step);
    },
  },
  watch: {
    userStore: {
      handler: function () {
        if (this.userStore.selectedProducts.length) {
          this.mainStore.enableShowConfirmation();
          this.mainStore.showButton();
        } else {
          this.mainStore.disableShowConfirmation();
          this.mainStore.hideButton();
        }
      },
      deep: true,
    },
  },
  step(currentStep) {
    this.mainStore.setButtonParams(tgButtonParams[currentStep]);
  },
};
</script>
