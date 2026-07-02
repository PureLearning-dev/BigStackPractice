const glob = require('glob');
const path = require('path');
const { sep } = path;

/**
 * extend loader
 * @param {object} app Koa 实例
 *
 * 加载所有 extend，可通过 'app.extend.${文件}` 访问
 *
 * 例子：
 * app/extend
 *   |
 *   | -- custom-extend.js

 * => 可通过 app.extend.customExtend 进行访问
 * */
module.exports = (app) => {
    // 读取 app/extend/**.js
    const extendPath = path.resolve(app.businessPath, `.${sep}extend`);
    // jsFileList 是符合条件的 JS 文件路径集合，后续通过 require 进行加载
    const jsFileList = glob.sync(path.resolve(extendPath, `*.js`));

    jsFileList.forEach(file => {
        // 提取文件路径
        let filePath = path.resolve(file);

        // 截取路径 -> 抛掉 filePath 前面的 **/app/extend/ 部分
        let fileName = filePath.substring(filePath.lastIndexOf(`extend${sep}`) + `extend${sep}`.length, filePath.lastIndexOf('.'));

        // 把 '-' 统一改为驼峰式
        fileName = fileName.replace(/-(\w)/g, (_, char) => char.toUpperCase());

        // 判断 extend 的名称是否在 app 中存在
        for (const key in app) {
            if (key === fileName) {
                console.log(`[exception extend error] name: ${fileName} is already in app`);
                return ;
            }
            app[fileName] = require(filePath)(app);
        }
    });
}