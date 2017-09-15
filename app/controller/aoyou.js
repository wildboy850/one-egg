// app/controller/aoyou.js
module.exports = app => {
    class AoyouController extends app.Controller {
        * aoyoudata(){
            //请求数据 非模板
            const ctx = this.ctx;
            //调用service方法
            const data = yield this.service.dataService.takePageData(ctx.params.id);
            ctx.body = data;
        }
        * aoyouplay() {
            const ctx = this.ctx;
            //调用service方法
            const data = yield this.service.dataService.takeData(ctx.params.id);
            if(data.redata){
                yield ctx.render('/'+ctx.params.id+'/pug/index.pug',data);
            }
        }
    }
    return AoyouController;
};