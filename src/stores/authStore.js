import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, // Decoded from JWT
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
      this.decodeUser();
    },
    decodeUser() {
      if (!this.token) return;
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        this.user = {
          username: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        };
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
    initialize() {
      if (this.token) {
        this.decodeUser();
      }
    }
  }
});
