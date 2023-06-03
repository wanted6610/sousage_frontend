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
      let data = JSON.stringify({
        chat_id: "974203396",
        parse_mode: "MarkdownV2",
        text: "*Ваш заказ:*\nСосиска  1шт\nПицца  1шт\n\nСумма заказа: *50р*",
      });

      try {
        await this.axios.post(
          "https://api.telegram.org/bot5631016202:AAExzVN3_KpJVAWqJIkOigTQ6YqP4uxwaLA/sendMessage",
          data
        );
        this.mainStore.close();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
