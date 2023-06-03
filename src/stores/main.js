import { defineStore } from "pinia";

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
        enableShowConfirmation() {
            this.tg.enableClosingConfirmation();
        },
        disableShowConfirmation() {
            this.tg.disableClosingConfirmation();
        },
        showButton() {
            tg.MainButton.show();
        },
        hideButton() {
            tg.MainButton.hide();
        },
        showBackButton() {
            tg.BackButton.show();
        },
        hideBackButton() {
            tg.BackButton.hide();
        },
        setButtonParams(params) {
            tg.MainButton.setParams(params);
        },
        setButtonCallback(callback) {
            tg.MainButton.onClick(callback);
        },
        removeButtonCallBack(callback) {
            tg.MainButton.offClick(callback);
        },
        setBackButtonCallback(callback) {
            tg.BackButton.onClick(callback);
        },
        removeBackButtonCallback(callback) {
            tg.BackButton.offClick(callback);
        },
        showButtonProgress() {
            tg.MainButton.showProgress();
        },
        hideButtonProgress() {
            tg.MainButton.hideProgress();
        }
    },
  })