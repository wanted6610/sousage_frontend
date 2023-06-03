<template>
  <p>stepOne</p>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";

export default {
  mounted() {
    console.log("mounted step1");
    this.mainStore.setButtonCallback(() => this.nextStep());
  },
  beforeUnmount() {
    this.mainStore.removeButtonCallBack(() => this.nextStep());
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
