import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import tooltipDirective from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: 'AIzaSyBtWdcxQCvwNJf97ibwj4BJkqFPAgZnfhY',
  authDomain: 'vue-crm-ba549.firebaseapp.com',
  databaseURL: 'https://vue-crm-ba549.firebaseio.com',
  projectId: 'vue-crm-ba549',
  storageBucket: 'vue-crm-ba549.appspot.com',
  messagingSenderId: '144980094983',
  appId: '1:144980094983:web:31b879600091fce1227aa2'
};
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
