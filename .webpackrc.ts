import path  from "path";
// 改配置见： roadhog的npm文档： https://www.npmjs.com/package/roadhog
// http: 127.0.0.1:8000/api/user => http://127.0.0.1:7001/user
export default {
    "proxy": {
        "/api" : {
            "target" : "http://127.0.0.1:7001", // 目标源
            "changeOrigin" : true, // 切换来源
            "pathRewrite": {"/api": ""} // 去掉user
        }
    },
    alias: {
        '@': path.resolve('src')
    }
}