const Koa = require('koa');
const path = require('path');
const env = require('./env');
// 兼容不同 OS 中的斜杠
const { sep } = path;

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

        console.log(`项目 baseDir = ${app.baseDir}，项目 businessPath = ${app.businessPath}`);

        console.log(`项目环境 = ${app.env.getCurrentEnvironment()}`);

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