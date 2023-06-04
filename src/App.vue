<template>
  <div class="main">
    <div v-if="loadingPage" class="counter">
      <vue-countdown
        :time="2 * 24 * 60 * 60 * 1000"
        v-slot="{ minutes, seconds }"
        @end="endOrders"
      >
        <p class="counter__text">
          Прием заказов закончится через
          {{ minutes <= 9 ? `0${minutes}` : minutes }}:{{
            seconds <= 9 ? `0${seconds}` : seconds
          }}
        </p>
      </vue-countdown>
    </div>
    <v-container>
      <step-one-content v-if="step === 0" @change-step="changeStep" />
      <step-two-content v-if="step === 1" @change-step="changeStep" />
    </v-container>
  </div>
</template>

<style lang="scss">
body {
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
}
#app {
  min-height: 100vh;
  min-width: 100vw;
  padding: 0;
  margin: 0;
}
.counter {
  background: #f44336;
  padding: 10px;
  &__text {
    font-size: 12px;
    font-weight: 300;
    color: #ffffff;
  }
}
</style>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "./stores/main";
import { useUserStore } from "./stores/user";
import { useProductStore } from "./stores/products";
import VueCountdown from "@chenfengyuan/vue-countdown";

import "./tgButtonParams";
import tgButtonParams from "./tgButtonParams";
import StepOneContent from "./components/step_one/StepOneContent.vue";
import StepTwoContent from "./components/step_two/StepTwoContent.vue";

export default {
  data() {
    return {
      step: 0,
      loadingPage: false,
    };
  },
  components: {
    StepOneContent,
    StepTwoContent,
    VueCountdown,
  },
  computed: {
    ...mapStores(useMainStore, useUserStore, useProductStore),
  },
  mounted() {
    this.mainStore.expand();

    this.productsStore.getProducts();
    // load products and set app ready
    this.loadingPage = true;
    this.mainStore.ready();
    this.changeButtonParams(this.step);
  },
  methods: {
    endOrders() {
      this.mainStore.close();
    },
    changeStep(step) {
      this.step = step;
    },
    changeButtonParams(step) {
      this.mainStore.setButtonParams(tgButtonParams[step]);
    },
    setConfirmation() {
      if (this.userStore.selectedProducts.length) {
        this.mainStore.enableShowConfirmation();
      } else {
        this.mainStore.disableShowConfirmation();
      }
    },
  },
  watch: {
    userStore: {
      handler: function () {
        this.setConfirmation();
        if (this.userStore.selectedProducts.length) {
          this.mainStore.showButton();
        } else {
          this.mainStore.hideButton();
        }
      },
      deep: true,
    },
    step(currentStep) {
      this.setConfirmation();
      this.changeButtonParams(currentStep);
      if (currentStep > 0) {
        this.mainStore.showBackButton();
      } else {
        this.mainStore.hideBackButton();
      }
    },
  },
};
</script>
