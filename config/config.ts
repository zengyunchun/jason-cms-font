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
  routes: [
    { // 带有模板的路由, 多级路由必须放到前面，否则匹配不对
      path: '/admin', component: '../layouts/AdminLayout', routes: [
        { path: '/admin/user', component: './admin/user' },
        { path: '/admin/role', component: './admin/role' },
        { path: '/admin/resource', component: './admin/resource' },
      ]
    },
    { // 带有模板的路由
      path: '/', component: '../layouts/index', routes: [
        { path: '/', component: './index' },
      ]
    },

  ]
}

export default config;
