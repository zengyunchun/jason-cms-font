import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'cms',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  // routes: [
  //   { path: '/hello', component: './hello' }, // 单独的路由,还只能放到第一行了？？？
  //   { // 带有模板的路由
  //     path: '/', component: '../layouts/index', routes: [
  //       { path: '/', component: './index' },
  //       // { path: '/hello', component: './hello' },
  //     ]
  //   },
  // ]
}

export default config;
