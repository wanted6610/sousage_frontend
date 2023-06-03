import { defineStore } from "pinia"

const tg = window.Telegram.WebApp;

export const useMainStore = defineStore('main', {
    state: () => (
        { 
            tg: tg,
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
        },
        async showButton() {
            // this.tg.MainButton.show();
        }
    },
  })