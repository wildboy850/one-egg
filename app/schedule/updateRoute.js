const moment = require('moment');

// 异步读取配置
//页面上线时间表
module.exports = function () {
    const exports = {};
    exports.schedule = {
        interval: '1200s',
        immediate:true,
        type: 'all'
    };
    // task 是真正定时任务执行时被运行的函数，第一个参数是一个匿名的 Context 实例
    exports.task = function* (ctx) {
        console.log('轮询router配置');
        //数据库读取配置
        var rt = yield ctx.service.routerService.updateRouter();
    }
    return exports;
};