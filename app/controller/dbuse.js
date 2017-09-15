// app/controller/dbuse.js
//操作数据库
module.exports = app => {
    class DbuseController extends app.Controller {
        //数据库操作
        * mongoInsert(){
            const ctx = this.ctx;
/*            var pather1 = new ctx.model.Pather({"path":"/","action":"home.index"});
            pather1.save();*/
        }
    }
    return DbuseController;
};