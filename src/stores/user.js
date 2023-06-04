import { defineStore } from "pinia"

const tg = window.Telegram.WebApp;

function checkExistProduct(array, value) {
    return array.findIndex((item) => item.id === value.id);
}

export const useUserStore = defineStore('user', {
    state: () => (
        { 
            user: tg.initDataUnsafe?.user ?? null,
            selectedProducts: [],
        }
    ),
    actions: {
        addProduct(product) {
            let findIndex = checkExistProduct(this.selectedProducts, product);
            if (findIndex != -1) {
                this.selectedProducts[findIndex] = product;
            } else {
                this.selectedProducts.push(product);
            }
        },
        removeProduct(product) {
            let findIndex = checkExistProduct(this.selectedProducts, product);
            if (findIndex != -1) {
                if (product.quantity != 0) {
                    this.selectedProducts[findIndex] = product;
                } else {
                    this.selectedProducts.splice(findIndex, 1);
                }
            }
        }
    },
  })