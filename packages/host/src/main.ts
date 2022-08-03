import './bootstrap';

import { createApp } from 'vue';
import store from './store';
import router from './router';
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import '@ant-design-vue/pro-layout/dist/style.less';
// import ProTable from '@ant-design-vue/pro-table';
// import '@ant-design-vue/pro-table/dist/style.css';
// import WujieVue from 'wujie-vue3';

import { useXhr } from "./composables";

import App from './App.vue';

// const { setupApp, preloadApp, bus } = WujieVue;

const state = useXhr()

createApp(App)
  .use(store)
  .use(router)
  .use(Antdv)
  .use(ProLayout)
  .use(PageContainer)
  // .use(ProTable)
  // .use(WujieVue)
  .mount('#app');
