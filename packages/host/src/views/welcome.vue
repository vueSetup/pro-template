<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from '@/components/HelloWorld.vue';
import { shallowReactive, watchEffect } from 'vue';
import axios from 'axios';

const state = shallowReactive<{
  activeKey: string;
}>({
  activeKey: '1',
});

watchEffect(async () => {
  // const api = `https://dev-bi.dw.cnpc.com.cn/api/dashboard/v1/project/simple`;
  // const api = `https://bi-klsz.dw.cnpc.com.cn/api/dashboard/v1/project/simple`;
  // const { data } = await axios.get(api, { withCredentials: true });

  // const data = await fetch(api, { credentials: 'include' }).then(response => response.json());
  // console.log('data', data);
  console.log('state.activeKey', state.activeKey);
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <a-tabs v-model:activeKey="state.activeKey">
    <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
