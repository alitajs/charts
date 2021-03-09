import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Charts',
  mode: 'site',
  exportStatic: {},
  hash: true,
  locales: [
    ['zh-CN', '中文'],
    ['en-US', '英文'],
  ],
  favicon: 'https://alitajs.com/assets/img/meta/apple-touch-icon-114x114.png',
  logo:
    'https://user-images.githubusercontent.com/11746742/104428726-c2c90300-55bf-11eb-9b84-d52a86050b9a.png',
  theme: {
    '@hd': '0.02rem',
  },
  targets: {
    ios: 8,
  },
  sitemap: {
    hostname: 'https://charts.alitajs.com',
  },
  // 用于替换 __VERSION__ pkg.version
  extraBabelPlugins: ['version'],
  styles: [
    `.__dumi-default-mobile-demo-layout {
      padding: 0 !important;
      background-color: #F6F6F6;
    }`,
  ],
});
