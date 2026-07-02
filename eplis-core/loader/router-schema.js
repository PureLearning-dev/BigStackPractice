const path = require('path');
const glob = require('glob');
const { sep } = path;

/**
 * router-schema loader
 * @param {object} app koa 实例
 *
 * 通过 'json-schema & ajv' 对 api 规则进行约束，配置 api-params-verify 中间件使用
 *
 * 例子：app/router-schema/**js
 *
 * 输出：
 * app.routerSchema = {
 *     '${api1}: ${jsonSchema}',
 *     '${api2}: ${jsonSchema}',
 *     '${api3}: ${jsonSchema}',
 *     '${api4}: ${jsonSchema}',
 * }
 * */

module.exports = (app) => {
    // 读取 app/router-schema/**/**.js
    const routerSchemaPath = path.resolve(app.businessPath, `.${sep}router-schema`);
    // jsFileList 是符合条件的 JS 文件路径集合，后续通过 require 进行加载
    const jsFileList = glob.sync(path.resolve(routerSchemaPath, `.${sep}**${sep}*.js`));

    // 注册所有 routerSchema ，使得可以通过 'app.routerSchema' 进行访问
    let routerSchema = {};

    jsFileList.forEach(file => {
        routerSchema = {
            ...routerSchema,
            ...require(path.resolve(file)),
        }
    })

    app.routerSchema = routerSchema;
}