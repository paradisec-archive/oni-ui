import { createApp } from 'vue';
import VueCookies from 'vue-cookies';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { createHead } from '@unhead/vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { MankuIcon } from 'manku-icon-lib';

import { createGtm } from '@gtm-support/vue-gtm';

import configuration from '@/../configuration.json';

import App from './App.vue';
import router from './router';


import { ApiService } from './api.service';
// import HTTPService from './http.service';
// import MembershipService from './membership.service';

import '@/assets/main.css';

library.add(fas, far, fab);

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const head = createHead();
app.use(head);

app.use(router);
app.use(VueCookies);

app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('manku-icon', MankuIcon);

if (configuration.ui?.analytics?.gaMeasurementId) {
  const gtm = createGtm({
    id: configuration.ui.analytics.gaMeasurementId,
    vueRouter: router,
  });
  app.use(gtm);
}

const api = new ApiService();
app.provide('api', api);

// app.config.globalProperties.$http = new HTTPService({ router, loginPath: '/login' });
// app.config.globalProperties.$membership = new MembershipService({ router });

app.mount('#app');
