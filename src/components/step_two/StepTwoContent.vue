<template>
  <p>stepTwo</p>
</template>

<script>
export default {
  mounted() {
    console.log("mounted");
    tg.MainButton.onClick(this.nextStep());
  },
  methods: {
    nextStep() {
      this.$emit("change-step", 0);
    },
  },
};
</script>

<style></style>
