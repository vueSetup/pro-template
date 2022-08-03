import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// import VitePluginCertificate from 'vite-plugin-mkcert';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { join } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // Components({
    //   resolvers: [AntDesignVueResolver()],
    // })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
          ...getThemeVariables(),
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    // host: 'klia.dw.cnpc.com.cn',
    // port: 443,
    // https: true,
    proxy: {
      '/api': {
        target: 'http://11.11.50.32:51334/',
        changeOrigin: true,
      },
    },
  },
});
