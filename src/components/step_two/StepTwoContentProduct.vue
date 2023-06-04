<template>
  <div class="product">
    <v-img
      max-height="60"
      max-width="60"
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
    <div class="product-content">
      <p class="product-content__name">
        {{ product.name }}
        <span class="text-orange-darken-1">{{ product.quantity }}x</span>
      </p>
      <p class="product-content__description mt-1">{{ product.description }}</p>
    </div>
    <p class="product__price">{{ product.price * product.quantity }}р.</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.product {
  display: flex;
  align-items: center;
  text-align: left;
  &-content {
    flex: 1;
    padding: 0px 10px;
    &__description {
      font-weight: 300;
      font-size: 12px;
      color: var(--tg-theme-hint-color);
    }
  }
}
</style>
