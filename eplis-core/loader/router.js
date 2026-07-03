const KoaRouter = require('koa-router');
const path = require('path');
const glob = require('glob');
const { sep } = path;

/**
 * router loader
 * @param {object} app Koa 实例
 *
 * 解析 app/router/**.js ，加载到 KoaRouter 下
 * */

module.exports = (app) => {
    // 找到路由文件路径
    const routerPath = path.resolve(app.businessPath, `.${sep}router`);

    // 实例化 KoaRouter
    const router = new KoaRouter();

    // 注册所有路由
    // 统一导入路由，真正进行实现的路由在 app/router/**.js 中
    const routerFileList = glob.sync(path.resolve(routerPath, '**/*.js'));
    routerFileList.forEach(fileName => {
        // 在 router 实现文件中会通过传入的 router 进行挂在 api
        require(path.resolve(fileName))(app, router);
    })
    // 路由兜底（健壮性）
    router.get(`*`, async (ctx, next) => {
        ctx.status = 302;
        ctx.redirect(`${app?.option?.homePage}` ?? '/');
    })

    // 路由注册到 app 上
    app.use(router.routes());
    app.use(router.allowedMethods());
}