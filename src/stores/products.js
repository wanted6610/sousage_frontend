import { defineStore } from "pinia"
import mockProducts from "../mockProducts"

export const useProductStore = defineStore('products', {
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