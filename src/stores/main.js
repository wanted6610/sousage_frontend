import { defineStore } from "pinia"

export const useMainStore = defineStore('main', {
    state: () => (
        { 
            tg: window.Telegram.WebApp,
        }
    ),
    getters: {
      isExpanded: (state) => state.tg.isExpanded,
      viewportHeight: (state) => state.tg.viewportHeight,
    },
    actions: {
        close() {
            this.tg.close();
        },
        ready() {
            this.tg.ready();
        },
        expand() {
            this.tg.expand();
        },
        sendData(data) {
            this.tg.sendData(data);
        }
    },
  })