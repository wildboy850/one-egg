// app.js
module.exports = app => {
    app.beforeStart(function* () {
        //动态获取路由 不被建议
        const ctx = app.createAnonymousContext();
        const routerList = yield ctx.service.routerService.takeRoutesFormMongoDb();
        routerList.forEach(item => {
            app.get(item.path, item.action);
        });
    });
};