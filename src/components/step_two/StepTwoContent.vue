<template>
  <p>stepTwo</p>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";

export default {
  computed: {
    ...mapStores(useMainStore),
  },
  mounted() {
    console.log("mounted step2");
    this.mainStore.setButtonCallback(() => this.send());
    this.mainStore.setBackButtonCallback(() => this.changeStep());
  },
  beforeUnmount() {
    this.mainStore.removeButtonCallBack(() => this.send());
    this.mainStore.removeBackButtonCallback(() => this.nextStep());
  },
  methods: {
    changeStep() {
      this.$emit("change-step", 0);
    },
    async send() {
      this.mainStore.showButtonProgress();

      const data = new FormData();

      data.set("chat_id", "974203396");
      data.set("parse_mode", "MarkdownV2");
      data.set(
        "text",
        "*Ваш заказ:*\nСосиска  1шт\nПицца  1шт\n\nСумма заказа: *50р*"
      );

      try {
        await this.axios.post(
          `https://api.telegram.org/bot${
            import.meta.env.VITE_TELEGRAM_BOT_TOKEN
          }/sendMessage`,
          data
        );
      } catch (e) {
        console.log(e);
      }
      this.mainStore.close();
    },
  },
};
</script>

<style></style>
