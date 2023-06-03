<template>
  <div id="main">
    <p>TELEGRAM FRONT</p>
    <p @click="userStore.addProduct">TEST</p>
    <p @click="plus">change step + 1</p>
    <p @click="minus">change step - 1</p>
    <step-one-content v-if="step === 0" @change-step="changeStep" />
    <step-two-content v-if="step === 1" @change-step="changeStep" />
  </div>
</template>

<style>
body {
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
}
</style>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "./stores/main";
import { useUserStore } from "./stores/user";
import "./tgButtonParams";
import tgButtonParams from "./tgButtonParams";
import StepOneContent from "./components/step_one/StepOneContent.vue";
import StepTwoContent from "./components/step_two/StepTwoContent.vue";

export default {
  data() {
    return {
      step: 0,
    };
  },
  components: {
    StepOneContent,
    StepTwoContent,
  },
  computed: {
    ...mapStores(useMainStore, useUserStore),
  },
  mounted() {
    this.mainStore.expand();
    this.mainStore.ready();
    this.changeButtonParams(this.step);
  },
  methods: {
    changeStep(step) {
      this.step = step;
    },
    plus() {
      this.step = 1;
    },
    minus() {
      this.step = 0;
    },
    changeButtonParams(step) {
      this.mainStore.setButtonParams(tgButtonParams[step]);
    },
  },
  watch: {
    userStore: {
      handler: function () {
        if (this.userStore.selectedProducts.length) {
          this.mainStore.enableShowConfirmation();
          this.mainStore.showButton();
        } else {
          this.mainStore.disableShowConfirmation();
          this.mainStore.hideButton();
        }
      },
      deep: true,
    },
    step(currentStep) {
      console.log(currentStep);
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
