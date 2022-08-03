import { createRouter, createWebHistory } from 'vue-router';
import { BasicLayout } from '@/layouts';
import type { MenuDataItem } from './typing';

const routes: MenuDataItem[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: 'Home' },
    component: BasicLayout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        meta: { title: '欢迎' },
        component: () => import('../views/welcome.vue'),
      },
      {
        path: '/system',
        name: 'system',
        meta: { title: '系统配置' },
        children: [
          {
            path: '/system/navigation',
            name: 'system.navigation',
            meta: { title: '导航管理' },
            component: () => import('@/views/system/navigation-list.vue'),
          },
        ],
      },
      {
        path: '/about',
        name: 'dashboard',
        meta: { title: '管理页' },
        component: () => import('../views/About.vue'),
      },
      {
        path: '/:pathMatch(.*)',
        component: () =>
          import(/* webpackChunkName: "exception" */ '@/views/exception/404.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
