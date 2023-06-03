<template>
  <p>stepOne</p>
</template>

<script>
const tg = window.Telegram.WebApp;

export default {
  mounted() {
    console.log("mounted");
    tg.MainButton.onClick(this.nextStep());
  },
  methods: {
    nextStep() {
      this.$emit("change-step", 1);
    },
  },
};
</script>

<style></style>
