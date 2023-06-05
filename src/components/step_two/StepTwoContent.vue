<template>
  <div class="step">
    <div class="step-header">
      <h2 class="step-header__title">Ваш заказ</h2>
      <v-btn
        variant="text"
        rounded="lg"
        class="text-red-darken-1"
        @click="changeStep"
        >Изменить</v-btn
      >
    </div>
    <div class="step-list">
      <div
        class="step-list__item"
        v-for="(product, index) in userStore.selectedProducts"
        :key="product.id"
      >
        <div v-if="index > 0" class="divider"></div>
        <step-two-content-product :product="product" />
      </div>
    </div>
    <v-checkbox
      v-model="isAlternative"
      label="Нужна альтернатива?"
      color="red-darken-1"
      hide-details
    ></v-checkbox>
    <p class="step__total mt-2">
      Итоговая сумма заказа:
      <span class="step__price text-orange-darken-1"
        >{{ selectedProductsPrice }}р</span
      >.
    </p>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";
import { useUserStore } from "../../stores/user";
import StepTwoContentProduct from "./StepTwoContentProduct.vue";

export default {
  data() {
    return {
      isAlternative: false,
    };
  },
  components: {
    StepTwoContentProduct,
  },
  computed: {
    ...mapStores(useMainStore, useUserStore),
    selectedProductsPrice() {
      return this.userStore.selectedProducts.reduce(
        (sum, current) => sum + current.price * current.quantity,
        0
      );
    },
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

      let urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has('chatid')) return;

      this.mainStore.showButtonProgress();

      const data = new FormData();

      data.set("chat_id", urlParams.get('chatid'));
      data.set("parse_mode", "MarkdownV2");

      let sendedText = "*Ваш заказ:*";

      sendedText += "\n━━━━━━━━━━";

      this.userStore.selectedProducts.forEach(
        (product) => (sendedText += `\n${product.name} ╴ ${product.quantity}шт`)
      );

      sendedText += "\n━━━━━━━━━━";

      sendedText += `\nАльтернатива: *${this.isAlternative ? "✅" : "❎"}*\n`;

      sendedText += `\nСумма заказа: *${this.selectedProductsPrice}р*`;

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

<style lang="scss" scoped>
.step {
  &__total {
    text-align: right;
    font-weight: 500;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__title {
      font-size: 20px;
      font-weight: 500;
    }
  }
}
.divider {
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin: 5px 0;
}
</style>
