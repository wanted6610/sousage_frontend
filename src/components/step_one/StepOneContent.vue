<template>
  <v-row>
    <v-col
      cols="6"
      v-for="product in productsStore.products"
      :key="product.id"
      class="d-flex"
    >
      <step-one-content-product :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from "pinia";
import { useMainStore } from "../../stores/main";
import { useProductStore } from "../../stores/products";
import StepOneContentProduct from "./StepOneContentProduct.vue";

export default {
  components: { StepOneContentProduct },
  mounted() {
    this.mainStore.setButtonCallback(this.nextStep);
  },
  beforeUnmount() {
    this.mainStore.removeButtonCallBack(this.nextStep);
  },
  computed: {
    ...mapStores(useMainStore, useProductStore),
  },
  methods: {
    nextStep() {
      this.$emit("change-step", 1);
    },
  },
};
</script>

<style></style>
