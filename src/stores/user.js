import { defineStore } from "pinia"
import mockProducts from "../mockProducts"

export const useProductStore = defineStore('user', {
    state: () => (
        { 
            products: [],
        }
    ),
    actions: {
        getProducts() {
            // get products in mock data
            this.products = mockProducts;
        },
    },
  })