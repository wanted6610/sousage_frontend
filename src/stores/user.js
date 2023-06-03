import { defineStore } from "pinia"
import mockProducts from "../mockProducts";

const tg = window.Telegram.WebApp;

export const useUserStore = defineStore('user', {
    state: () => (
        { 
            user: tg.initDataUnsafe?.user ?? null,
        }
    ),
    actions: {
        getProducts() {
            // get products in mock data
            this.products = mockProducts;
        },
    },
  })