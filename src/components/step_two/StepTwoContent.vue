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
    async send() {
      tg.MainButton.showProgress();

      const data = new FormData();

      data.set("chat_id", "974203396");
      data.set("parse_mode", "MarkdownV2");
      data.set(
        "text",
        "*Ваш заказ:*\nСосиска  1шт\nПицца  1шт\n\nСумма заказа: *50р*"
      );

      //   let data = JSON.stringify({
      //     chat_id: "974203396",
      //     parse_mode: "MarkdownV2",
      //     text: "*Ваш заказ:*\nСосиска  1шт\nПицца  1шт\n\nСумма заказа: *50р*",
      //   });

      try {
        await this.axios.post(
          "https://api.telegram.org/bot5631016202:AAExzVN3_KpJVAWqJIkOigTQ6YqP4uxwaLA/sendMessage",
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
