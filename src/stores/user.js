import { defineStore } from "pinia"

const tg = window.Telegram.WebApp;

function checkExistProduct(array, value) {
    return array.findIndex((item) => item.id === value.id);
}

export const useUserStore = defineStore('user', {
    state: () => (
        { 
            user: tg.initDataUnsafe?.user ?? null,
            selectedProducts: [{
                id: 0,
                name: 'Сосиска',
                description: 'Сочная сосиска, запеченная в хрустящем тесте.',
                price: 50,
                quantity: 3,
            },    {
                id: 1,
                name: 'Пицца',
                description: 'Суперзвезда итальянской кухни.',
                price: 50,
                quantity: 5,
            },],
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