import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = '6ae2756942a271712c6cc4e736580026';
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
});
