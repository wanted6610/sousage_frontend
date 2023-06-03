<template>
  <p>stepTwo</p>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";

const tg = window.Telegram.WebApp;

export default {
  computed: {
    ...mapStores(useMainStore),
  },
  mounted() {
    console.log("mounted");
    tg.MainButton.onClick(() => this.send());
  },
  methods: {
    send() {
      this.mainStore.sendData();
    },
  },
};
</script>

<style></style>
