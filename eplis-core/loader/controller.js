const glob = require('glob');
const path = require('path');
const { sep } = path;

/**
 * controller loader
 * @param {object} app Koa 实例
 *
 * 加载所有 controller，可通过 'app.controller.${目录}.${文件}` 访问
 *
 * 例子：
 * app/controller
 *   |
 *   | -- custom-module
 *          |
 *          | -- custom-controller.js
 * => 可通过 app.controller.customModule.customController 进行访问
 * */
module.exports = (app) => {
    // 读取 app/controller/**/**.js
    const controllerPath = path.resolve(app.businessPath, `.${sep}controller`);
    // jsFileList 是符合条件的 JS 文件路径集合，后续通过 require 进行加载
    const jsFileList = glob.sync(path.resolve(controllerPath, `.${sep}**${sep}*.js`));

    // 遍历所有文件目录，把内容挂载到 app.controller 下
    const controllers = {};

    jsFileList.forEach(file => {
        // 提取文件路径
        let filePath = path.resolve(file);

        // 截取路径 -> 抛掉 filePath 前面的 **/app/controller/ 部分
        let fileName = filePath.substring(filePath.lastIndexOf(`controller${sep}`) + `controller${sep}`.length, filePath.lastIndexOf('.'));

        // 把 '-' 统一改为驼峰式
        fileName = fileName.replace(/-(\w)/g, (_, char) => char.toUpperCase());

        // 挂载 controller 到 controllers 对象中
        // tempMiddleware 可以理解为一个游标，如果不是最终的文件，可以一直在属性对象中向里层移动
        /**
         * 例子：当截取后的路径为：'user/auth'，经历一次 for 循环后，可以得到：
         *
         * controllers = {
         *     user: {
         *         auth: [controller 函数]
         *     }
         * }
         * */
        let tempMiddleware = controllers;
        const names = fileName.split(sep);

        for (let i = 0, l = names.length; i < l; i++) {
            // 此时为最终的文件，否则为目录
            if (i === l - 1) {
                //
                tempMiddleware[names[i]] = require(filePath)(app);
            } else {
                if (!tempMiddleware[names[i]]) {
                    tempMiddleware[names[i]] = {};
                }
                tempMiddleware = tempMiddleware[names[i]];
            }
        }
    });

    app.controller = controllers;
}