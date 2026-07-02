const Koa = require('koa');
const path = require('path');
const env = require('./env');
// 兼容不同 OS 中的斜杠
const { sep } = path;

// 引入 Loader
const configLoader = require('./loader/config');
const controllerLoader = require('./loader/controller');
const extendLoader = require('./loader/extend');
const middlewareLoader = require('./loader/middleware');
const routerLoader = require('./loader/router');
const routerSchemaLoader = require('./loader/router-schema');
const serviceLoader = require('./loader/service');

// 核心引擎，将项目的配置完成并提供核心功能
module.exports = {
    /**
     * 启动项目
     * @params options 项目配置
     * */
    start(options = {}) {
        const app = new Koa();
        // 应用配置
        app.options = options;
        // 基础路径
        app.baseDir = process.cwd();
        // 业务文件路径
        app.businessPath = path.resolve(app.baseDir, `.${sep}app`);
        // 项目环境配置
        app.env = env();

        // 加载 loader
        loadingLoader(app);

        console.log(`-- [start] baseDir: ${app.baseDir} --`);
        console.log(`-- [start] businessPath: ${app.businessPath} --`);

        console.log(`-- [start] env: ${app.env.getCurrentEnvironment()} --`);

        try {
            const port = process.env.PORT || 8080;
            const host = process.env.HOST || '0.0.0.0';
            app.listen(port, host);

            console.log(`Server started on port ${port}`);
        } catch (error) {
            console.error(error);
        }
    }
}

function loadingLoader(app) {
    // 1. 加载 middleware
    middlewareLoader(app);
    console.log(`-- [start] load middleware done --`);

    // 2. 加载 routerSchema
    routerSchemaLoader(app);
    console.log(`-- [start] load router-schema done --`);

    // 3. 加载 controller
    controllerLoader(app);
    console.log(`-- [start] load controller done --`);

    // 4. 加载 service
    serviceLoader(app);
    console.log(`-- [start] load service done --`);

    // 5. 加载 config
    configLoader(app);
    console.log(`-- [start] load config done --`);

    // 6. 加载 extend
    extendLoader(app);
    console.log(`-- [start] load extend done --`);

    // 7. 注册路由
    routerLoader(app);
    console.log(`-- [start] load router done --`);
}