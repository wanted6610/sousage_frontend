<template>
  <p>stepTwo</p>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";
import { useUserStore } from "../../stores/user";

export default {
  data() {
    return {
      isAlternative: false,
    };
  },
  computed: {
    ...mapStores(useMainStore, useUserStore),
  },
  mounted() {
    this.mainStore.setButtonCallback(this.send);
    this.mainStore.setBackButtonCallback(this.changeStep);
  },
  beforeUnmount() {
    this.mainStore.removeButtonCallBack(this.send);
    this.mainStore.removeBackButtonCallback(this.changeStep);
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

      let sendedText = "*Ваш заказ:*";

      this.userStore.selectedProducts.forEach(
        (product) => (sendedText += `\n${product.name} ${product.quantity}шт`)
      );

      const productSum = this.userStore.selectedProducts.reduce(
        (sum, current) => sum + current.price * current.quantity,
        0
      );

      sendedText += `\n Альтернатива: *${this.isAlternative ? "Да" : "Нет"}*`;

      sendedText += `\nСумма заказа: *${productSum}р*`;

      data.set("text", sendedText);

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
