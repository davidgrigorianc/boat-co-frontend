import {defineStore} from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    flagsCache: {},
  }),
  actions: {
    preloadFlag(countryCode) {
      if (!this.flagsCache[countryCode]) {
        const flagUrl = `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
        const img = new Image();
        img.src = flagUrl;
        img.onload = () => {
          this.flagsCache[countryCode] = flagUrl;
        };
      }
    },
  },
  getters: {
    getFlagUrl: (state) => (countryCode) => {
      return state.flagsCache[countryCode] || null;
    },
  },
});
