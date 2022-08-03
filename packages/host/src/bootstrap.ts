// // polyfill
// // import "whatwg-fetch";
// // import "custom-event-polyfill";
// import router from './router';
// import { setupApp } from 'wujie';

// // const isProduction = process.env.NODE_ENV === "production";
// const isProduction = import.meta.env.MODE === 'production';

// const attrs = isProduction ? { src: 'https://klia.dw.cnpc.com.cn' } : {};

// const props = {
//   jump: (name: string) => {
//     router.push({ name });
//   },
// };

// const credentialsFetch = (url: RequestInfo | URL, options: RequestInit | undefined) => {
//   const isApi = (url as string).includes('/api/');
//   console.log('credentialsFetch', url);
//   return window.fetch(url, { ...options, credentials: isApi ? 'include' : 'omit' });
// };

// const plugins = [
//   {
//     htmlLoader: (code: string) => {
//       console.log('html-loader');
//       return code;
//     },
//     jsBeforeLoaders: [
//       {
//         callback(appWindow: Window) {
//           console.log('js-before-loader-callback', appWindow.__WUJIE.id);
//         },
//       },
//     ],
//     jsLoader: (code: string, url: string) => {
//       console.log('js-loader', url);
//       return code;
//     },
//     jsAfterLoaders: [
//       {
//         callback(appWindow: Window) {
//           console.log('js-after-loader-callback', appWindow.__WUJIE.id);
//         },
//       },
//     ],
//     cssBeforeLoaders: [
//       //在加载html所有的样式之前添加一个外联样式
//       // { src: 'https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/HDaBURp7.css' },
//       //在加载html所有的样式之前添加一个内联样式
//       // { content: 'img{width: 300px}' },
//     ],
//     cssLoader: (code: string, url: string) => {
//       console.log('css-loader', url, code.slice(0, 50) + '...');
//       return code;
//     },
//     cssAfterLoaders: [
//       //在加载html所有样式之后添加一个外联样式
//       // { src: 'https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/FQsK8IN6.css' },
//       //在加载html所有样式之后添加一个内联样式
//       // { content: 'img{height: 300px}' },
//     ],
//   },
// ];

// const degrade =
//   window.localStorage.getItem('degrade') === 'true' ||
//   !window.Proxy ||
//   !window.CustomElementRegistry;

// declare global {
//   interface Window {
//     // 是否存在无界
//     __POWERED_BY_WUJIE__?: boolean;
//     // 子应用mount函数
//     __WUJIE_MOUNT: () => void;
//     // 子应用unmount函数
//     __WUJIE_UNMOUNT: () => void;
//     // 子应用无界实例
//     __WUJIE: { id: string; mount: () => void };
//   }
// }

// const lifecycles = {
//   beforeLoad: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
//   beforeMount: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
//   afterMount: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
//   beforeUnmount: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
//   afterUnmount: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
//   activated: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
//   deactivated: (appWindow: Window) =>
//     console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
//   loadError: (url: string, e: Error) => console.log(`${url} 加载失败`, e),
// };

// /**
//  * 配置应用，主要是设置默认配置
//  * preloadApp、startApp的配置会基于这个配置做覆盖
//  */
// setupApp({
//   name: 'klia',
//   url: 'https://dev-bi.dw.cnpc.com.cn/?ticket=ST-2576-FH2ZWvd47XB0dinE6MmU-x-sso',
//   // url: 'https://bi-klsz.dw.cnpc.com.cn/',
//   attrs,
//   exec: true,
//   props,
//   fetch: credentialsFetch,
//   plugins,
//   prefix: { 'prefix-dialog': '/dialog', 'prefix-location': '/location' },
//   degrade,
//   ...lifecycles,
// });
// setupApp({
//   name: 'klia-db',
//   url: 'https://dev-bi.dw.cnpc.com.cn/#/full-screen/11182/19579',
//   // url: 'https://bi-klsz.dw.cnpc.com.cn/',
//   attrs,
//   exec: true,
//   props,
//   fetch: credentialsFetch,
//   plugins,
//   prefix: { 'prefix-dialog': '/dialog', 'prefix-location': '/location' },
//   degrade,
//   ...lifecycles,
// });

// // import microApp from '@micro-zoe/micro-app';
// // microApp.start();
