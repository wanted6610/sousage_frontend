<template>
  <p>stepOne</p>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";
// const tg = window.Telegram.WebApp;

export default {
  mounted() {
    console.log("mounted step1");
    this.mainStore.setButtonCallback(() => this.nextStep());
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    nextStep() {
      this.$emit("change-step", 1);
    },
  },
};
</script>

<style></style>
