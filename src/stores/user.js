import { defineStore } from "pinia"
import mockProducts from "../mockProducts";

const tg = window.Telegram.WebApp;

export const useUserStore = defineStore('user', {
    state: () => (
        { 
            user: tg.initDataUnsafe?.user ?? null,
            selectedProducts: [],
        }
    ),
    actions: {
        addProduct() {
            this.selectedProducts.push(1);
        },
    },
  })