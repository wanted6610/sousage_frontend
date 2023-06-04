<template>
  <div class="product">
    <v-img
      max-height="100"
      src="https://spkfood.ru/upload/iblock/95d/95d9c67418d6b26be3dc8a4e2c886090.png"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    <p class="product__name mt-2">{{ product.name }}</p>
    <p class="product__description mt-2">{{ product.description }}</p>
    <div class="product__buttons mt-2">
      <!-- <transition mode="out-in"> -->
      <v-btn
        block
        v-if="quantity === 0"
        @click="addProduct"
        rounded="lg"
        class="bg-orange-lighten-1"
        >Добавить</v-btn
      >
      <v-row v-else no-gutters justify="space-between">
        <v-btn @click="removeProduct" rounded="lg" class="bg-red">-</v-btn>
        <v-btn @click="addProduct" rounded="lg" class="bg-orange-lighten-1"
          >+</v-btn
        >
      </v-row>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  data() {
    return {
      quantity: 0,
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    this.getCurrentQuantity();
  },
  methods: {
    changeQuantity(quantity) {
      this.quantity = quantity;
    },
    removeProduct() {
      this.changeQuantity(this.quantity - 1);
      this.userStore.removeProduct({
        ...this.product,
        quantity: this.quantity,
      });
    },
    addProduct() {
      this.changeQuantity(this.quantity + 1);
      this.userStore.addProduct({ ...this.product, quantity: this.quantity });
    },
    getCurrentQuantity() {
      let findIndex = this.userStore.selectedProducts.findIndex(
        (product) => product.id === this.product.id
      );
      if (findIndex != -1) {
        this.quantity = this.userStore.selectedProducts[findIndex].quantity;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  text-align: left;
  display: flex;
  flex-direction: column;
  &__name {
  }
  &__description {
    font-weight: 300;
    flex: 1;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
